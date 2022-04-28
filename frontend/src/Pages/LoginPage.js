function LoginPage(props) {
  console.log('hi')
  const backendURL = props.backendURL;
  return <GoogleSignIn backendURL={backendURL} />;
}

function GoogleSignIn(props) {
  const backendURL = props.backendURL;

  return (<div>
      <div id="g_id_onload"
         data-client_id="514647942452-4j1gla2p1ekgtje0utsthn3ebn17eaf5.apps.googleusercontent.com"
         data-login_uri={`${backendURL}/gsignin`}        
         data-auto_prompt="false">
      </div>
      <div className="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>
  </div>);
}

export default LoginPage;