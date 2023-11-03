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
                    'MOSAIC',
                    style= {
                        "fontSize": "30px",
                        "fontWeight": "bolder",
                        "letterSpacing": "5px",
                        "fontFamily": "Open Sans,Sans-serif",
                        "background": "-webkit-linear-gradient(-45deg, #035a8a, #078f15)",
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
                        "color": 'black'
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
            get_input_field('Email','Email',''),
            get_input_field('Lock','Password','password'),
            pc.container(height = '20px'),
            pc.button(
                pc.text(
                    'Log In',
                    style = {
                        'fontSize':'20px',
                        'color':'black',
                        'textAlign':'end',
                    },
                ),
                style = {
                    'float':'right',
                },
                color_scheme = 'black'
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
        bg = 'rgba(255,255,255,0.9)',
        borderRadius='20px',
        boxShadow='9px 9px 50px #ceddf5'
    )

    _main = pc.container(
        login_container,
        center_content=True,
        justifyContent='center',
        maxWidth='auto',
        #width='80vh' 가로 길이
        height='100vh', #세로 길이
        style={
        'background-image': "url('mosaic.jpg')",
        'background-size': 'cover',  # 배경 이미지 크기 조절
        'background-repeat': 'no-repeat',  # 배경 이미지 반복 제거
        },
    )
    return _main


app = pc.App()
app.add_page(index)
app.compile()