<h1 align="center" style="border-bottom: none;">:robot: Chatbot integrated with an Web-based system sample</h1>
<h3 align="center">This Node.js app, Watson Assistant Chatbot (IBM) and this Web Chat sample demonstrates the integration of a chatbot with an web-based system.</h3>

![Demo](readme_images/demo.png)

---------------------------------------------------------------

# Node app

## Prerequisites

1. Download and install [Node.js](https://nodejs.org/en/).

2. Download and install [MongoDB](https://www.mongodb.com/).
    - Create a database
    - Create a collection.

3. For this example

## Configuring the app

1. Install the dependencies

    ```
    npm install
    ```

1. Create a **.env** file inside the root folder of the app located in:
    
    `<project_root>/node-server`

    - The content of the .env file must be:
    ```
        DB_URL = <MongoDB URL>
        DB_NAME = <name>
        HOST = <The url of the app, "http://127.0.0.1:8081" for example>
        COLLECTION = <Collection that the app is going to use>
    ```

2. Run the application

    ```
    npm start
    ```

3. For this example to work correctly, the application must be published on a server. I recommend publishing on an [AWS server](https://aws.amazon.com/), where you are able to create a simple server and put it online for one year free of charge.

---------------------------------------------------------------

# Chatbot

## Prerequisites

1. Sign up for an [IBM Cloud account](https://cloud.ibm.com/registration/).
1. Create an instance of the Watson Assistant service and open the console.
    - Go to the [Watson Assistant](https://cloud.ibm.com/catalog/services/conversation) page in the IBM Cloud Catalog
    - Click **Create**
    - Go to your [Resource List](https://cloud.ibm.com/resources) and select the previously create Watson Assistant service
    - Click **Launch Watson Assistant** to open the console

IBM divides a chatbot into **assistants** and **skills**, where assistants are the chatbots themselves and skills are the chatbot's ability to process language and respond, on the console you are able to associate a chatbot with a skill.

## Creating the Skill for the chatbot

1. In your IBM Cloud console, select the **Skills** option.

2. Click **Create Skill**.

3. Select **Dialog skill** and hit next.

4. Select **Import skill** and upload the JSON located in:

    `<project_root>/watson-assistant-skill/skill-Pizzaria.json`

5. Click **Import**.

## Configuring the Skill

1. Open the skill **Pizzaria**.

2. Click **Options** and then **Webhooks**.

3. Fill in the URL field with:

    `<YOUR HOST URL>/pizzaria/dashboard/webhook`

    - The Node app must be published so the chatbot can send requests to it.

## Creating the Assistant

1. In your IBM Cloud console, select the **Assistant** option.

2. Click **Create Assistant**.

    - Enter tha name and the description and hit **create**.

3. Select your assistant and click **Add dialog skill**.

4. Select the **pizzaria** skill.

4. Click **Integrate Web Chat**.

5. Create an integration.

6. Save your **integrationID**.

7. Click **Save Changes**.

---------------------------------------------------------------

# Web Chat

## Configuring the Web Chat

1. Open the file located in:
    
    `<project_root>/web-site-chatbot-example/js/init.js`

2. Replace the text **INTEGRATION_ID** with your integrationID.

3. Run the example located in:

    `<project_root>/web-site-chatbot-example/index.html`

[demo_url]: https://assistant-simple.ng.bluemix.net/
[doc_intents]: https://cloud.ibm.com/docs/services/conversation/intents-entities.html#planning-your-entities
[docs]: https://cloud.ibm.com/docs/services/assistant/index.html#index
[docs_landing]: (https://cloud.ibm.com/docs/services/assistant/index.html#index)
[node_link]: (http://nodejs.org/)
[npm_link]: (https://www.npmjs.com/)
[sign_up]: https://cloud.ibm.com/registration