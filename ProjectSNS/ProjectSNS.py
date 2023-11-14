import pynecone as pc

class State(pc.State):
    new_item1:str
    new_item2:str
    input_string1:str
    input_string2:str
    user_email:str
    user_password:str
    def add_info(self):
        if self.new_item1 and self.new_item2:
            self.user_email = self.new_item1
            self.new_item1=""
            self.user_password = self.new_item2
            self.new_item2=""
            print(self.user_email)
            print(self.user_password)
    def clear_input(self):
        self.input_string1=""
        self.input_string2=""
        
class login_container():
    login_container = pc.container(
        pc.vstack(
            pc.container(height= '75px'),
            pc.container(
                pc.text(
                    'Aurora',
                    style= {
                        "fontSize": "40px",
                        "fontWeight": "bolder",
                        "letterSpacing": "5px",
                        "fontFamily": "Open Sans,Sans-serif",
                        "background": "-webkit-linear-gradient(-45deg, #e04a3f, #4e8be6)",
                        "-webkit-background-clip": "text",
                        "color": "transparent",
                    },
                    center_content =True,
                ),
            ),
        ),
        pc.vstack(
            pc.container(height= '5px'),
            pc.container(
                pc.text('Create a picture with your story!',
                    style= {
                        "fontSize": "15px",
                        "letterSpacing": "3.5px",
                        "color": 'black',
                        "font-family" : "Helvetica, Sans-serif",
                    },
                    center_content =True,
                ),
            ),
            pc.container(
                pc.container(height='30px'),
                pc.image(
                    src="mosaic.ico",
                    alt="star",
                    style={"width": "100px", "height": "100px"},
                ),
                center_content=True,
            ),
            pc.container(height='50px'),
            pc.hstack(
                pc.icon(
                    tag='Email',
                    color='black',
                    fontSize='12px',
                ),
                pc.input(
                    value=State.input_string1,
                    on_change=State.set_input_string1,
                    on_blur=State.set_new_item1,
                    placeholder=r"Email",
                    bg = 'rgba(255,255,255,0.7)',
                ),
            ),
            pc.hstack(
                pc.icon(
                    tag='Lock',
                    color='black',
                    fontSize='12px',
                ),
                pc.input(
                    value=State.input_string2,
                    on_change=State.set_input_string2,
                    on_blur=State.set_new_item2,
                    placeholder=r"Password",
                    bg = 'rgba(255,255,255,0.7)',
                ),
            ),
            pc.container(height = '20px'),
            pc.button(
                pc.text(
                    '로그인',
                    style = {
                        'fontSize':'22px',
                        'color':'green',
                        'textAlign':'end',
                    },
                ),
                style = {
                    'float':'right',
                },
                color_scheme = 'black',
                on_click=State.add_info,
                on_mouse_up = State.clear_input,
            ),
            pc.container(height='50px'),
            pc.hstack(
                pc.button(
                    pc.text(
                        '회원가입',
                        style = {
                            'color':'black',
                            'fontSize':'13px',
                            'weight':'bolder',
                        },
                    ),
                    color_scheme='black',
                ),
                pc.container(width='20px'),
                pc.button(
                    pc.text(
                        'ID찾기',
                        style={
                            'color':'black',
                            'fontSize':'13px',
                            'weight':'bolder',
                            'textAlign':'end',
                        },
                    ),
                    color_scheme='black',
                ),                 
                pc.container(width='20px'),
                pc.button(
                    pc.text(
                        '비밀번호찾기',
                        style={
                            'color':'black',
                            'fontSize':'13px',
                            'weight':'bolder',
                            'textAlign':'end',
                        },
                    ),
                    color_scheme='black', 
                ),
            ),
        ),
        
        width ='500px',
        height='75vh',
        center_content=True,
        bg = 'rgba(255,255,255,0.7)',
        borderRadius='20px',
        boxShadow='9px 9px 50px #ceddf5'
    )
            

def index():
    _main = pc.container(
        login_container.login_container,
        center_content=True,
        justifyContent='center',
        maxWidth='auto',
        #width='80vh' 가로 길이
        height='100vh', #세로 길이
        style={
        'background-image': "url('aurora.jpg')",
        'background-size': 'cover',  # 배경 이미지 크기 조절
        'background-repeat': 'no-repeat',  # 배경 이미지 반복 제거
        },
    )
    return _main


app = pc.App(state=State)
app.add_page(index)
app.compile()