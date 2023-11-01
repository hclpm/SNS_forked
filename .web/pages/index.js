import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, Container, HStack, Image, Input, Text, VStack, useColorMode} from "@chakra-ui/react"
import {EmailIcon, LockIcon} from "@chakra-ui/icons"
import NextHead from "next/head"

const EVENT = "ws://localhost:8000/event"
export default function Component() {
const [default_state, setDefault_state] = useState({"events": [{"name": "default_state.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const { colorMode, toggleColorMode } = useColorMode()
const Event = events => setDefault_state({
  ...default_state,
  events: [...default_state.events, ...events],
})
useEffect(() => {
  if(!isReady) {
    return;
  }
  const reconnectSocket = () => {
    socket.current.reconnect()
  }
  if (typeof socket.current !== 'undefined') {
    if (!socket.current) {
      window.addEventListener('focus', reconnectSocket)
      connect(socket, default_state, setDefault_state, result, setResult, router, EVENT)
    }
  }
  const update = async () => {
    if (result.state != null) {
      setDefault_state({
        ...result.state,
        events: [...default_state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(default_state, setDefault_state, result, setResult, router, socket.current)
  }
  update()
})
return (
<Container centerContent={true}
sx={{"justifyContent": "center", "maxWidth": "auto", "height": "100vh", "bg": "#000000"}}><Container centerContent={true}
sx={{"width": "500px", "height": "75vh", "bg": "#ffffff", "borderRadius": "15px", "boxShadow": "-11px 11px 50px #9ecadb"}}><VStack><Container sx={{"height": "75px"}}/>
<Container><Text sx={{"fontSize": "25px", "fontWeight": "bolder", "letterSpacing": "5px", "fontFamily": "Georgia, Serif", "background": "-webkit-linear-gradient(-45deg, #fa0000, #f0b46c)", "-webkit-background-clip": "text", "color": "transparent", "centerContent": true}}>{`ONESTARGRAM`}</Text></Container></VStack>
<VStack><Container sx={{"height": "10px"}}/>
<Container><Text sx={{"fontSize": "15px", "letterSpacing": "2px", "color": "black", "centerContent": true}}>{`Start a strong social network service!`}</Text></Container>
<Container centerContent={true}><Image src="stardark.ico"
sx={{"width": "100px", "height": "120px", "alt": "star"}}/></Container>
<Container sx={{"borderBottom": "0.3px solid green", "width": "300px", "height": "43px"}}><HStack><EmailIcon sx={{"color": "green", "fontSize": "12px"}}/>
<Input placeholder="Email"
focusBorderColor="black"
type="text"
sx={{"border": "0px", "fontWeight": "semibold", "fontSize": "13px", "type": ""}}/></HStack></Container>
<Container sx={{"borderBottom": "0.3px solid green", "width": "300px", "height": "43px"}}><HStack><LockIcon sx={{"color": "green", "fontSize": "12px"}}/>
<Input placeholder="PassWord"
focusBorderColor="black"
type="text"
sx={{"border": "0px", "fontWeight": "semibold", "fontSize": "13px", "type": "password"}}/></HStack></Container>
<Button sx={{"float": "right"}}><Text sx={{"fontSize": "12px", "color": "black", "textAlign": "end"}}>{`비밀번호를 잊어버리셨나요?`}</Text></Button>
<Container sx={{"height": "55px"}}/>
<HStack><Button colorScheme="blue"><Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder"}}>{`회원가입`}</Text></Button>
<Container sx={{"width": "130px"}}/>
<Button colorScheme="blue"><Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder", "textAlign": "end"}}>{`로그인`}</Text></Button></HStack></VStack></Container>
<NextHead><title>{`Pynecone App`}</title>
<meta name="description"
content="A Pynecone app."/>
<meta property="og:image"
content="favicon.ico"/></NextHead></Container>
)
}