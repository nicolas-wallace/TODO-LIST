class Todo:
    def __init__(self, id: int, title: str, done: bool, user_id: int):
        self.id = id
        self.title = title
        self.done = done
        self.user_id = user_id

    def mark_done(self):
        self.done = True

    def mark_undone(self):
        self.done = False
