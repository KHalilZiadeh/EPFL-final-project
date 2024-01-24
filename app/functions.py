import re
import datetime
from flask import redirect


def get_page(page_name):
    try:
        page = open("templates/" + page_name + ".html")
        page_content = page.read()
        page.close()
        return page_content
    except:
        return redirect("error-page")


def write_file(file_name, data):
    try:
        file = open("./data/" + file_name + ".txt", "a")
        file.write(data)
        file.close()
    except:
        file = open("./data/" + file_name + ".txt", "w")
        file.write(data)
        file.close()


def clear_file(file_name, data):
    file = open("./data/" + file_name + ".txt", "w")
    file.write(data)
    file.close()


def read_file(file_name):
    file = ""
    content = ""
    try:
        file = open("./data/" + file_name + ".txt")
        content = file.read().split('\n')
        file.close()
    except:
        file = open("./data/" + file_name + ".txt", "w")
        content = ""
    return content


def read_room_file():
    try:
        # read room data from the file
        file = open("./data/rooms.txt")
        content = file.read().split('\n')
        file.close()
    except:
        # if not found read the data from the keeper file and recreate and read the data
        file = open("./data/keeper.txt")
        content = file.read()
        file.close()
        file = open("./data/rooms.txt", "w")
        file.write(content)
        file.close()
        read_room_file()

    return content


def get_room_data(id):
    if id != None:
        rooms_data = read_room_file()
        for room_line in rooms_data:
            if f"room_id:{id}" in room_line:
                return room_line


def get_day():
    cur_t = datetime.datetime.now()
    return str(cur_t.year) + "-" + str(cur_t.month) + "-" + str(cur_t.day)


def check_date(date):
    now_date = get_day().split("-")
    user_date = date.split("-")

    if (int(user_date[0]) >= int(now_date[0]) and int(user_date[1]) == int(now_date[1]) and int(user_date[2]) >= int(now_date[2])):
        return False
    elif (int(user_date[0]) >= int(now_date[0]) and int(user_date[1]) > int(now_date[1])):
        return False
    else:
        return True


def validate_data(data):
    room_use = ["interview", "meeting", "presentation"]
    if len(data) == 7:
        if not (0 < int((data[0])) and int((data[0])) < 5):
            return "Please enter valid room"
        pattern = r'^[a-zA-Z\s.]+$'
        if not re.match(pattern, data[1]):
            return "Please enter valid name"
        if int(data[2]) <= 0 or int(data[2]) > int(get_room_data((data[0])).split("\\")[0][-1]):
            return "Please enter valid seats number"
        if data[3] not in get_room_data((data[0])).split("\\")[2]:
            return "Please enter valid use"
        if check_date(data[4]):
            return "Please enter valid date"
        if int(data[5]) < 8 or 20 < int(data[5]):
            return "Please enter valid start time"
        if int(data[6]) < int(data[5]) or 20 < int(data[6]):
            return "Please enter valid end time"
        return True
    else:
        if not (data[0] in room_use or get_room_data(data[0])):
            return "please enter valid data"
        if check_date(data[1]):
            return "please enter vaild date"
        if int(data[2]) < 8 or 20 < int(data[2]):
            return "Please enter valid start time"
        if int(data[3]) == 0 or 20 < (int(data[2]) + int(data[3])):
            return "Please enter valid duration"
        return True
