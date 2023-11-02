import { Fragment, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { connect, E, getRefValue, isTrue, preventDefault, processEvent, refs, set_val, uploadFiles } from "/utils/state"
import "focus-visible/dist/focus-visible"
import { Box, Button, Container, HStack, Image, Input, Text, useColorMode, VStack } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import NextHead from "next/head"


export default function Component() {
  const [default_state, setDefault_state] = useState({"events": [{"name": "default_state.hydrate"}], "files": []})
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
      setDefault_state(state => ({
        ...state,
        events: [...state.events, ...events],
      }))
  }

  // Function to add new files to be uploaded.
  const File = files => setDefault_state(state => ({
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
      connect(socket, default_state, setDefault_state, result, setResult, router, ['websocket', 'polling'], setNotConnected)
    }

    // If we are not processing an event, process the next event.
    if (!result.processing) {
      processEvent(default_state, setDefault_state, result, setResult, router, socket.current)
    }

    // If there is a new result, update the state.
    if (result.state != null) {
      // Apply the new result to the state and the new events to the queue.
      setDefault_state(state => ({
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
      processEvent(default_state, setDefault_state, result, setResult, router, socket.current)
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
    const change_complete = () => Event([E('default_state.hydrate', {})])
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
  <Fragment><Fragment>
  <Container centerContent={true} sx={{"justifyContent": "center", "maxWidth": "auto", "height": "100vh", "bg": "#edccaf"}}>
  <Container centerContent={true} sx={{"width": "500px", "height": "75vh", "bg": "rgba(255,255,255,0.3)", "borderRadius": "15px", "boxShadow": "-11px 11px 50px #000000"}}>
  <VStack>
  <Container sx={{"height": "75px"}}/>
  <Container>
  <Text sx={{"fontSize": "25px", "fontWeight": "bolder", "letterSpacing": "5px", "fontFamily": "Georgia, Serif", "background": "-webkit-linear-gradient(-45deg, #fa0000, #f0b46c)", "-webkit-background-clip": "text", "color": "transparent", "centerContent": true}}>
  {`ONESTARGRAM`}
</Text>
</Container>
</VStack>
  <VStack>
  <Container sx={{"height": "10px"}}/>
  <Container>
  <Text sx={{"fontSize": "15px", "letterSpacing": "2px", "color": "black", "centerContent": true}}>
  {`Start a strong social network service!`}
</Text>
</Container>
  <Container centerContent={true}>
  <Container sx={{"height": "30px"}}/>
  <Image src="stardark.ico" sx={{"width": "120px", "height": "120px", "alt": "star"}}/>
</Container>
  <Container sx={{"height": "50px"}}/>
  <Container sx={{"borderBottom": "0.3px solid green", "width": "300px", "height": "43px"}}>
  <HStack>
  <EmailIcon sx={{"color": "green", "fontSize": "12px"}}/>
  <Input focusBorderColor="black" placeholder="Email" sx={{"border": "0px", "fontWeight": "semibold", "fontSize": "13px", "type": ""}} type="text"/>
</HStack>
</Container>
  <Container sx={{"borderBottom": "0.3px solid green", "width": "300px", "height": "43px"}}>
  <HStack>
  <LockIcon sx={{"color": "green", "fontSize": "12px"}}/>
  <Input focusBorderColor="black" placeholder="Password" sx={{"border": "0px", "fontWeight": "semibold", "fontSize": "13px", "type": "password"}} type="text"/>
</HStack>
</Container>
  <Button colorScheme="black" sx={{"float": "right"}}>
  <Text sx={{"fontSize": "12px", "color": "black", "textAlign": "end"}}>
  {`비밀번호를 잊어버리셨나요?`}
</Text>
</Button>
  <Container sx={{"height": "55px"}}/>
  <HStack>
  <Button colorScheme="black">
  <Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder"}}>
  {`회원가입`}
</Text>
</Button>
  <Container sx={{"width": "130px"}}/>
  <Button colorScheme="black">
  <Text sx={{"color": "black", "fontSize": "13px", "weight": "bolder", "textAlign": "end"}}>
  {`로그인`}
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
