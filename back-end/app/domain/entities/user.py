class User:
    def __init__(self, id: int, username: str, password: str, email: str):
        self.id = id
        self.username = username
        self.password = password
        self.email = email

    def check_password(self, password: str) -> bool:
        # Em produção, use hash seguro
        return self.password == password
