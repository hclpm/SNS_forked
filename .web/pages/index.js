import { Fragment, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { connect, E, getRefValue, isTrue, preventDefault, processEvent, refs, set_val, uploadFiles } from "/utils/state"
import "focus-visible/dist/focus-visible"
import { Box, Button, Container, HStack, Image, Input, Text, useColorMode, VStack } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import NextHead from "next/head"


export default function Component() {
  const [state, setState] = useState({"input_string1": "", "input_string2": "", "is_hydrated": false, "new_item1": "", "new_item2": "", "user_email": "", "user_password": "", "events": [{"name": "state.hydrate"}], "files": []})
  const [result, setResult] = useState({"state": null, "events": [], "final": true, "processing": false})
  const [notConnected, setNotConnected] = useState(false)
  const router = useRouter()
  const socket = useRef(null)
  const { isReady } = router
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  // Function to add new events to the event queue.
  const Event = (events, _e) => {
      preventDefault(_e);
      setState(state => ({
        ...state,
        events: [...state.events, ...events],
      }))
  }

  // Function to add new files to be uploaded.
  const File = files => setState(state => ({
    ...state,
    files,
  }))

  // Main event loop.
  useEffect(()=> {
    // Skip if the router is not ready.
    if (!isReady) {
      return;
    }

    // Initialize the websocket connection.
    if (!socket.current) {
      connect(socket, state, setState, result, setResult, router, ['websocket', 'polling'], setNotConnected)
    }

    // If we are not processing an event, process the next event.
    if (!result.processing) {
      processEvent(state, setState, result, setResult, router, socket.current)
    }

    // If there is a new result, update the state.
    if (result.state != null) {
      // Apply the new result to the state and the new events to the queue.
      setState(state => ({
        ...result.state,
        events: [...state.events, ...result.events],
      }))

      // Reset the result.
      setResult(result => ({
        state: null,
        events: [],
        final: true,
        processing: !result.final,
      }))

      // Process the next event.
      processEvent(state, setState, result, setResult, router, socket.current)
    }
  })

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => Event([E('state.hydrate', {})])
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
  <Fragment><Fragment>
  <Container centerContent={true} sx={{"background-image": "url('aurora.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "justifyContent": "center", "maxWidth": "auto", "height": "100vh"}}>
  <Container centerContent={true} sx={{"width": "500px", "height": "75vh", "bg": "rgba(255,255,255,0.7)", "borderRadius": "20px", "boxShadow": "9px 9px 50px #ceddf5"}}>
  <VStack>
  <Container sx={{"height": "75px"}}/>
  <Container>
  <Text sx={{"fontSize": "40px", "fontWeight": "bolder", "letterSpacing": "5px", "fontFamily": "Open Sans,Sans-serif", "background": "-webkit-linear-gradient(-45deg, #e04a3f, #4e8be6)", "-webkit-background-clip": "text", "color": "transparent", "centerContent": true}}>
  {`Aurora`}
</Text>
</Container>
</VStack>
  <VStack>
  <Container sx={{"height": "5px"}}/>
  <Container>
  <Text sx={{"fontSize": "15px", "letterSpacing": "3.5px", "color": "black", "font-family": "Helvetica, Sans-serif", "centerContent": true}}>
  {`Create a picture with your story!`}
</Text>
</Container>
  <Container centerContent={true}>
  <Container sx={{"height": "30px"}}/>
  <Image src="mosaic.ico" sx={{"width": "100px", "height": "100px", "alt": "star"}}/>
</Container>
  <Container sx={{"height": "50px"}}/>
  <HStack>
  <EmailIcon sx={{"color": "black", "fontSize": "12px"}}/>
  <Input onBlur={_e => Event([E("state.set_new_item1", {value:_e.target.value})], _e)} onChange={_e => Event([E("state.set_input_string1", {value:_e.target.value})], _e)} placeholder="Email" sx={{"bg": "rgba(255,255,255,0.7)"}} type="text" value={state.input_string1}/>
</HStack>
  <HStack>
  <LockIcon sx={{"color": "black", "fontSize": "12px"}}/>
  <Input onBlur={_e => Event([E("state.set_new_item2", {value:_e.target.value})], _e)} onChange={_e => Event([E("state.set_input_string2", {value:_e.target.value})], _e)} placeholder="Password" sx={{"bg": "rgba(255,255,255,0.7)"}} type="text" value={state.input_string2}/>
</HStack>
  <Container sx={{"height": "20px"}}/>
  <Button colorScheme="black" onClick={_e => Event([E("state.add_info", {})], _e)} onMouseUp={_e => Event([E("state.clear_input", {})], _e)} sx={{"float": "right"}}>
  <Text sx={{"fontSize": "22px", "color": "green", "textAlign": "end"}}>
  {`로그인`}
</Text>
</Button>
  <Container sx={{"height": "50px"}}/>
  <HStack>
  <Button colorScheme="black">
  <Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder"}}>
  {`회원가입`}
</Text>
</Button>
  <Container sx={{"width": "20px"}}/>
  <Button colorScheme="black">
  <Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder", "textAlign": "end"}}>
  {`ID찾기`}
</Text>
</Button>
  <Container sx={{"width": "20px"}}/>
  <Button colorScheme="black">
  <Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder", "textAlign": "end"}}>
  {`비밀번호찾기`}
</Text>
</Button>
</HStack>
</VStack>
</Container>
</Container>
  <NextHead>
  <title>
  {`Pynecone App`}
</title>
  <meta content="A Pynecone app." name="description"/>
  <meta content="favicon.ico" property="og:image"/>
</NextHead>
</Fragment>
    </Fragment>
  )
}
