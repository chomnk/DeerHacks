import React from 'react'

import './Login.css'

const Login = (props) => {
  const loginWithRedirect = props.loginWithRedirect;
  const user = props.user;
  const isAuthenticated = props.isAuthenticated;
  const isLoading = props.isLoading;
  return (
    <div className="page1-container">
      <div className="page1-opening-page">
        <span className="page1-text">
          <span>Trash Cam</span>
        </span>
        <div className="page1-get-started">
          <span className="page1-text02">
            <div onClick={() => loginWithRedirect()}>Get Started</div>
          </span>
        </div>

        <div className="page1-visualize">
          <span className="page1-text07">
            <span className="page1-text08">Visualize</span>
            <span> where the garbage goes.</span>
          </span>
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/2b725cda-0a41-436f-931d-b3c6bea39d42?org_if_sml=190605&amp;force_format=original"
            alt="image41464"
            className="page1-image4"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/f9522c34-cb9e-4c5b-b8b1-4753d8f3b494?org_if_sml=1438&amp;force_format=original"
            alt="image141475"
            className="page1-image14"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/34211b52-0504-445a-8f61-c1f3f83538b5?org_if_sml=1438&amp;force_format=original"
            alt="image81469"
            className="page1-image8"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/59155567-f364-4b89-a9d9-45864b445906?org_if_sml=1438&amp;force_format=original"
            alt="image51466"
            className="page1-image5"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/e1adcf2c-a36a-4c30-8cc9-b656f0001bd3?org_if_sml=1438&amp;force_format=original"
            alt="image71468"
            className="page1-image7"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/9163d7f8-0427-4caa-8af5-b4ab322a3b61?org_if_sml=1438&amp;force_format=original"
            alt="image61467"
            className="page1-image6"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/1b816264-584f-4a0f-96ec-e860831d7c69?org_if_sml=1438&amp;force_format=original"
            alt="image171478"
            className="page1-image17"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/2e77a434-d11c-4a44-8377-e4367bd421ee?org_if_sml=1438&amp;force_format=original"
            alt="image161477"
            className="page1-image16"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/8994072a-7bfe-43e0-819a-b87553ba585e?org_if_sml=1438&amp;force_format=original"
            alt="image151476"
            className="page1-image15"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/1f3e6e3c-446e-4b80-b3cb-5b9991e2c690?org_if_sml=1438&amp;force_format=original"
            alt="image131474"
            className="page1-image13"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/057e04c9-68b6-4e9d-932e-d0614052651c?org_if_sml=1438&amp;force_format=original"
            alt="image121473"
            className="page1-image12"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/4fdc0921-8ebf-4be3-996a-27f508f35290?org_if_sml=1438&amp;force_format=original"
            alt="image111472"
            className="page1-image11"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/fbdc6c69-69da-436a-8015-40527b2e7d61?org_if_sml=1438&amp;force_format=original"
            alt="image101471"
            className="page1-image10"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/e5c2879b-224d-42d1-bd28-3c80279be169?org_if_sml=1438&amp;force_format=original"
            alt="image91470"
            className="page1-image9"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/ffe61852-6eed-41a6-a218-e985b16582ac?org_if_sml=1819&amp;force_format=original"
            alt="Ellipse11479"
            className="page1-ellipse1"
          />
        </div>
        <div className="page1-detection">
          <span className="page1-text10">
            <span>
              <span>Detect where you should</span>
              <br></br>
              <span>throw away your waste with groundbreaking</span>
              <br></br>
              <span></span>
            </span>
            <span>AI technology.</span>
          </span>
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/f240711a-4c87-4b65-aed1-fe4a9173ef84?org_if_sml=1151308&amp;force_format=original"
            alt="image31251"
            className="page1-image3"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/c4322b7f-94ea-4fa4-b547-283e5f51f199?org_if_sml=1123&amp;force_format=original"
            alt="Rectangle11252"
            className="page1-rectangle1"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/713d51c5-3b1a-4ae9-a660-3a84fdfa05f6?org_if_sml=1170&amp;force_format=original"
            alt="Rectangle21253"
            className="page1-rectangle2"
          />
          <span className="page1-text18">
            <span>Recycle Bin</span>
          </span>
        </div>
        <div className="page1-track-progress">
          <span className="page1-text20">
            <span className="page1-text21">Track your progress</span>
            <span>
              {' '}
              and be happy that you are helping make the city a cleaner place!
            </span>
          </span>
          <img
            src="/line11480-z72q.svg"
            alt="Line11480"
            className="page1-line1"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/ed575f13-981a-46ab-91de-176633c5022a?org_if_sml=1238&amp;force_format=original"
            alt="Rectangle31481"
            className="page1-rectangle3"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/d4bfb70b-6be2-47ec-b65d-b64fb7527b07?org_if_sml=1304&amp;force_format=original"
            alt="Rectangle61484"
            className="page1-rectangle6"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/0d0a854a-a99b-41d6-8e6a-cec11afeba87?org_if_sml=1196&amp;force_format=original"
            alt="Rectangle51483"
            className="page1-rectangle5"
          />
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/935f4c43-aaeb-4cd0-bebf-31f4f01a18a9?org_if_sml=1243&amp;force_format=original"
            alt="Rectangle71485"
            className="page1-rectangle7"
          />
          <span className="page1-text23">
            <span>February 19, 2024</span>
          </span>
          <span className="page1-text25">
            <span>Waste Classified: 3 Items</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login;





