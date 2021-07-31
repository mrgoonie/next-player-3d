import styles from '../Button/styles.module.scss';
import { Button } from 'components';
import { useEffect, useState } from 'react';
import Config from 'lib/config';
import Axios from 'axios';
import qs from 'qs'

export default ({
  color = "primary",
  children,
  onClick,
  className = ""
}) => {
  const classNames = " " + className + " " + color;

  const [scriptInjected, setScriptInjected] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (scriptInjected) return;

    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    // script.async = true;
    document.body.appendChild(script);

    window.fbAsyncInit = function () {
      FB.init({
        appId: Config.api.fbAppId,
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });

      FB.AppEvents.logPageView();

      FB.getLoginStatus(fbLoginCallback);
    };

    setScriptInjected(true)
  }, [scriptInjected])

  const fbLoginCallback = (response) => {
    console.log(response)
    // get access_token and send to backend
    window.fbAccessToken = response.authResponse.accessToken

    if (response.status === 'connected') {
      console.log("response.authResponse: ", response.authResponse);
      // Logged into your webpage and Facebook.
      // try to fetch for info
      FB.api("/me", (user) => {
        console.log(user)
        window.fbUserInfo = user

        // save info into session
        saveSession()

        // send access_token to backend api
        saveToken()

        setLoggedIn(true)
      })


    } else {
      // The person is not logged into your webpage or we are unable to tell.
    }
  }

  const saveToken = () => {
    const apiUrl = `${Config.api.basePath}/login/facebook?access_token=${window.fbAccessToken}&post_id=`
    Axios.get(apiUrl, {
      headers: {
        'Authentication': 'Bearer YOUR_ENCRYPTED_TOKEN_HERE'
      }
    }).then((res) => console.log(res))
  }

  const saveSession = () => {
    var data = qs.stringify({
      access_token: window.fbAccessToken,
      username: window.fbUserInfo.name,
      fbid: window.fbUserInfo.id
    })
    console.log(data)

    Axios.post("/api/session", data).then((res) => console.log(res))
  }

  const loginClickHandler = () => {
    FB.login(fbLoginCallback, { scope: 'public_profile,email' });
  }

  return (
    <div>
      <Button
        className={classNames}
        onClick={loginClickHandler}
        color={color}
      >
        {!loggedIn ? children : "Welcome, " + window.fbUserInfo.name}
      </Button>
    </div>
  );
};