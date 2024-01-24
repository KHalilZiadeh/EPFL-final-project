from flask import Flask,  request, redirect
import app.functions as function
import app.classes as space_share

app = Flask(__name__)
app = Flask(__name__, template_folder="views")
if __name__ == '__main__':
    app.run(debug=True)


@app.route("/")
def login():
    return function.get_page("/index")


@app.route("/getroomdata")
def roomdata():
    id = request.args.get("id")[-1]
    return function.get_room_data(id)


@app.route("/submit")
def submit():
    user = ""
    room = ""
    seats = ""
    res_type = ""
    date = ""
    start = ""
    end = ""
    data = []
    if request.args:
        room = request.args.get("room")
        user = request.args.get("username").strip(" ")
        seats = request.args.get("seats")
        res_type = request.args.get("type")
        date = request.args.get("date")
        start = request.args.get("start")
        end = request.args.get("end")
        data = [room, user, seats, res_type, date, start, end]

    function.validate_data(data)

    reserv = space_share.Register(
        user, room, seats, res_type, date, start, end)
    reserv.write_reservation("history", reserv)
    return "true"


@app.route("/history")
def history():
    room_id = ""
    if request.args:
        room_id = request.args.get("room")
        all_reserv = space_share.Register.read_reservations()
        room_res = []
        for line in all_reserv:
            if "room_id:"+room_id in line:
                line = line.split(",")
                room_res.append(line[0]+"="+line[2].split(":")[1]+"="+line[5].split(":")[
                    1]+"="+line[6].split(":")[1]+"-"+line[7].split(":")[1])

    return room_res


@app.route("/clear")
def clear():
    space_share.Register.clear_reservations()
    return "True"


@app.route("/validate")
def validate():
    print((request.args))
    req_data = request.args

    queries = []
    data = []
    for query in req_data:
        data.append(req_data[query])
        queries.append(query)
    validation = function.validate_data(data)
    if validation == True:
        if len(data) == 7:
            return redirect("/submit?room="+data[0]+"&username="+data[1]+"&seats="+data[2]+"&type="+data[3]+"&date="+data[4]+"&start="+data[5]+"&end="+data[6])
        else:
            return redirect("/checkroom?term="+data[0]+"&date="+data[1]+"&start="+data[2]+"&duration="+data[3])
    else:
        return validation


@app.route("/checkroom")
def checkroom():
    term = ""
    rooms = []
    date = ""
    start = ""
    duration = ""
    result = []
    start_end = []
    # if there is queries
    if request.args:
        # check for search method
        term = request.args.get("term")
        date = request.args.get("date")
        start = int(request.args.get("start"))
        duration = int(request.args.get("duration"))

    # get all reservations
    all_reservs = space_share.Register.read_reservations()

    # if searching by room use
    if term != None:
        rooms_resrvs = []
        start_end = [[], [], [], [], []]
        result = ["True", "True", "True", "True", "True"]
        rooms = space_share.Register.filter_rooms(term)
        # get rooms with the same use
        for room in rooms:
            if room != "None":
                rooms_resrvs.append([])
                for res in all_reservs:
                    if res.find(room) >= 0:
                        rooms_resrvs[int(room[-1])-1].append(res)
            else:
                rooms_resrvs.append("None")
        # make rooms that has no reservation available
        for i in range(len(rooms)):
            if (rooms[i] == "None"):
                rooms_resrvs[i] = "None"
                # check if the room is available for the trem
            elif rooms[i] != "None" and (rooms_resrvs[i] == "None" or len(rooms_resrvs[i]) == 0):
                rooms_resrvs[i] = "True"

        # extract reservations start and end time in each room based on date
        for i in range(len(rooms_resrvs)):
            if rooms_resrvs[i] == "None":
                result[i] = "None"
            elif rooms_resrvs[i] == "True":
                result[i] = "True"
            else:
                for res in rooms_resrvs[i]:
                    if res.find(date) > -1:
                        match = res.find("startHour:")
                        old_start_time = res[match + 10:match + 12]
                        match = res.find("endHour:")
                        old_end_time = res[match + 8:match + 10]
                        start_end[i].append(
                            old_start_time + "-" + old_end_time)

        # is the room busy?
        for i in range(len(start_end)):
            if start_end[i] != "":
                for dates in start_end[i]:
                    dates = dates.split("-")
                    old_start = int(dates[0])
                    old_end = int(dates[1])
                    # check for intersection
                    if (old_start <= start and start < old_end) or (old_start < start + duration and start + duration <= old_end):
                        result[i] = "False"
                        break

    return str(result)


@app.errorhandler(404)
def page_not_found(error):
    return function.get_page("error-page"), 404
