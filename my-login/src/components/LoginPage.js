import * as React from 'react';
import { useRef, useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import {signInWithGoogle, signUp, useAuth, logOut} from '../Firebase.js'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    async function handleLogout(){
        setLoading(true);
        try{
            await logOut()
        }catch{
            alert('error!')
        }
        setLoading(false);
    }

    async function handleSignUp(){
        setLoading(true);
        try{
            await signUp(emailRef.current.value, passwordRef.current.value);
        }catch{
            alert("Error!")
        }
        setLoading(false);
    }

  return (
    <CssVarsProvider>
      <main>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in by {currentUser?.email}</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
            ref={emailRef}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            ref={passwordRef}
          />
          <button sx={{ mt: 1 /* margin top */ }}
            disable={loading || currentUser}
            onClick={handleSignUp}
          >
            Log in
          </button>
          <button sx={{ mt: 1 /* margin top */ }}
            disable={loading || !currentUser}
            onClick={handleLogout}
          >
            Log out
          </button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}