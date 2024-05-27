*This is a submission for the [The AWS Amplify Fullstack TypeScript Challenge ](https://dev.to/challenges/awschallenge)*

## What we Built
We created **_Echodiary_**, a user-friendly diary-making Web App using AWS Amplify Gen 2. Echodiary allows users to document their daily experiences by talking to our mascot _Echo_, which transcribes voice to text, or by writing entries manually. Users can enhance their diary entries with photos, making memories more vivid. The app features a one-click AI Content Enhancement ✨ to improve grammar and structure. Additionally, _AI-generated_ weekly highlights and personalized suggestions help users reflect on their week and improve mental health and personal growth.

Echodiary combines advanced technology with user-friendly features to offer a seamless and enriching diary-keeping experience.

## Demo
- Live Deployment: [echodiary.live](https://echodiary.live/)
- Source Code: 
[GitHub Repository](https://github.com/EchoDiary/EchoDiary)

#### Dashboard Page
![Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7atdk94heyjeg0ygrg9j.png)

#### Creating New Diary Entry
![New Diary](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xtzbot6hxjdeoijjwbga.png)

#### Diary Entry with Mood Analysis
![mood](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zkn2s65ierxc9fwlg0w2.png)

#### Landing Page
![Landing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j932ljt61673izh2fa84.png)




## Journey
<!-- Tell us about your process, the services you incorporated, what you learned, anything you are particularly proud of, what you hop to do next, etc. . -->

Initially, we set out to create a basic CRUD app with Amplify, but as we dove into development, we were astounded by its capabilities. This got us thinking about ways to push the envelope. We noticed the lack of a modern diary app infused with AI. What started as a simple diary app evolved into something much grander.

We recognized that traditional typing might not suit everyone, so we integrated **_speech recognition_** to allow users to express themselves orally. But we didn't stop there. We wanted to elevate the content beyond mere transcription, so we introduced _**AI-enhanced features**_ to refine grammar and structure.

However, we found that the experience lacked warmth. To bridge this gap, we introduced "_echo_" our friendly mascot, to foster a sense of connection with the user. With echo, users could engage in a dialogue, making the app feel more like conversing with a friend.

As our diary entries accumulated, we realized the potential for insights. Thus, we incorporated **mood tracking** and **AI-generated highlights** to distill meaningful moments from the entries. The result is an app that not only captures moments but also enriches and reflects upon them.

As we progressed with development, we encountered and familiarized ourselves with numerous functionalities such as Amplify Serverless Functions and leveraged AWS Bedrock to enhance our AI capabilities, ultimately refining our app for optimal performance.


### Connected Components and Feature Full

_We have used Connected Components and all four features: Data, Authentication, Serverless functions, and File Storage._

<!-- Let us know if you developed UI using Amplify connected components for UX patterns, and/or if your project includes all four features: data, authentication, serverless functions, and file storage. -->
- **Data:** 
The diary entries are securely stored in Amplify Storage (DynamoDB) with authorization rules ensuring that only the diary owner has access.
- **Authentication:**
The users are authenticated using Amplify Auth(Cognito) to access the Dashboard and create diary entries.
- **File Storage:**
Users can add images to the Diary Entries which are securely stored in Private/Protected S3 Buckets using Amplify Storage
- **Serverless Function:** We utilize a serverless function to invoke the _AWS Bedrock_ Model (mistral-7b-instruct) for enhancing diary text content and generating weekly highlights for users.

- **Connected Components:** We used the Authenticator Connected Component to manage user authentication and the Storage Image and Storage Manager components to handle images within diary entries.

#### Additional Features
- **AWS Bedrock:** We used AWS Bedrock to enhance the diary text content and to generate the Weekly Highlights using Mistral AI's  mistral-7b-instruct model.
- **Amplify AI/ML Predictions (AWS Comprehend):** We used Amplify Predictions to perform Sentiment Analysis of the user's diary to analyze their mood.
- **Voice Enabled Diaries:** We used the [Web Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) to let users express their thoughts with their voice and transcribe them into the diary text.
- **AI Content Enhancement:** We used AWS Bedrock to enhance the diary's text content and improve the grammar and structure and also to generate Weekly Highlights.

![System Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7labebwyyb6k525l8mbf.png)


 


<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

