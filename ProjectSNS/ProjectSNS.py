import pynecone as pc

def get_input_field(icon: str, placeholder: str, _type: str):
    return pc.container(
        pc.hstack(
            pc.icon(
                tag=icon,
                color='green',
                fontSize='12px',
            ),
            pc.input(
                placeholder=placeholder,
                border='0px',
                focus_border_color='black',
                fontWeight='semibold',
                fontSize='13px',
                type=_type,
            ),
        ),
        borderBottom='0.3px solid green',
        width='300px',
        height='43px',
    )


def index():
    login_container = pc.container(
        pc.vstack(
            pc.container(height= '75px'),
            pc.container(
                pc.text(
                    'ONESTARGRAM',
                    style= {
                        "fontSize": "25px",
                        "fontWeight": "bolder",
                        "letterSpacing": "5px",
                        "fontFamily": "Georgia, Serif",
                        "background": "-webkit-linear-gradient(-45deg, #fa0000, #f0b46c)",
                        "-webkit-background-clip": "text",
                        "color": "transparent",
                    },
                    center_content =True,
                ),
            ),
        ),
        pc.vstack(
            pc.container(height= '10px'),
            pc.container(
                pc.text(
                    'Start a strong social network service!',
                    style= {
                        "fontSize": "15px",
                        "letterSpacing": "2px",
                        "color": 'black'
                    },
                    center_content =True,
                ),
            ),
            pc.container(
                pc.container(height='30px'),
                pc.image(
                    src="stardark.ico",
                    alt="star",
                    style={"width": "120px", "height": "120px"},
                ),
                center_content=True,
            ),
            pc.container(height='50px'),
            get_input_field('Email','Email',''),
            get_input_field('Lock','Password','password'),
            pc.button(
                pc.text(
                    '비밀번호를 잊어버리셨나요?',
                    style = {
                        'fontSize':'12px',
                        'color':'black',
                        'textAlign':'end',
                    },
                ),
                style = {
                    'float':'right',
                },
                color_scheme = 'black'
            ),
            pc.container(height='55px'),
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
                pc.container(width='130px'),
                pc.button(
                    pc.text(
                        '로그인',
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
        bg = 'rgba(255,255,255,0.3)',
        borderRadius='15px',
        boxShadow='-11px 11px 50px #000000'
    )

    _main = pc.container(
        login_container,
        center_content=True,
        justifyContent='center',
        maxWidth='auto',
        #width='80vh' 가로 길이
        height='100vh', #세로 길이
        bg='#edccaf', #배경 색상
    )
    return _main


app = pc.App()
app.add_page(index)
app.compile()
