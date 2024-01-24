import app.functions as function
import datetime


class Register():

    def __init__(self, user, room, seats, type, date, start_hour, end_hour):
        Register.count = self.check_id() + 1
        self.id = self.count
        self.user = user
        self.room = room
        self.seats = seats
        self.type = type
        self.date = date
        self.start_hour = start_hour
        self.end_hour = end_hour
        self.submit = self.submit_time()

    # check the last id and continue
    def check_id(self):
        reservations = function.read_file("history")
        if reservations[0] != "":
            Register.count = int(reservations[-1].split(",")[0])
        else:
            Register.count = 0
        return Register.count

    def write_reservation(self, where,  res_class):
        if function.read_file("history")[0] == "":
            res_str = str(res_class.id) + "," + "room_id:" + res_class.room + "," + "user:" + res_class.user + "," + "seats:" + res_class.seats + \
                "," + "type:" + res_class.type + "," + "date:" + res_class.date + "," + "startHour:" + \
                res_class.start_hour + "," + "endHour:" + \
                res_class.end_hour + "," + "submitted:" + res_class.submit
        else:
            res_str = "\n" + str(res_class.id) + "," + "room_id:" + res_class.room + "," + "user:" + res_class.user + "," + "seats:" + res_class.seats + \
                "," + "type:" + res_class.type + "," + "date:" + res_class.date + "," + "startHour:" + \
                res_class.start_hour + "," + "endHour:" + \
                res_class.end_hour + "," + "submitted:" + res_class.submit

        function.write_file(where, res_str)

    def submit_time(self):
        cur_t = datetime.datetime.now()
        return str(cur_t.year) + "-" + str(cur_t.month) + "-" + str(cur_t.day) + "-" + str(cur_t.hour) + "-" + str(cur_t.minute) + "-" + str(cur_t.second)

    @classmethod
    def read_reservations(self):
        return function.read_file('history')

    @classmethod
    def clear_reservations(self):
        function.clear_file("history", "")
        Register.count = 0

    @classmethod
    def filter_rooms(self, search_term):
        all_rooms = function.read_file('rooms')
        rooms = []
        for room in all_rooms:
            if search_term in room:
                room = room.split("\\")[0]
                rooms.append(room)
            else:
                rooms.append("None")
        return rooms
