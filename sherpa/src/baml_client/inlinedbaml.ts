/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
/* eslint-disable */
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
const fileMap = {
  
  "clients.baml": "// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview\n\nclient<llm> CustomGPT4o {\n  provider openai\n  options {\n    model \"gpt-4o\"\n    max_tokens 16384\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomGPT4oMini {\n  provider openai\n  retry_policy Exponential\n  options {\n    model \"gpt-4o-mini\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomSonnet {\n  provider anthropic\n  options {\n    model \"claude-3-5-sonnet-20241022\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n\nclient<llm> CustomHaiku {\n  provider anthropic\n  retry_policy Constant\n  options {\n    model \"claude-3-haiku-20240307\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/round-robin\nclient<llm> CustomFast {\n  provider round-robin\n  options {\n    // This will alternate between the two clients\n    strategy [CustomGPT4oMini, CustomHaiku]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/fallback\nclient<llm> OpenaiFallback {\n  provider fallback\n  options {\n    // This will try the clients in order until one succeeds\n    strategy [CustomGPT4oMini, CustomGPT4oMini]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/retry\nretry_policy Constant {\n  max_retries 3\n  // Strategy is optional\n  strategy {\n    type constant_delay\n    delay_ms 200\n  }\n}\n\nretry_policy Exponential {\n  max_retries 2\n  // Strategy is optional\n  strategy {\n    type exponential_backoff\n    delay_ms 300\n    mutliplier 1.5\n    max_delay_ms 10000\n  }\n}",
  "generators.baml": "// This helps use auto generate libraries you can use in the language of\n// your choice. You can have multiple generators if you use multiple languages.\n// Just ensure that the output_dir is different for each generator.\ngenerator target {\n    // Valid values: \"python/pydantic\", \"typescript\", \"ruby/sorbet\", \"rest/openapi\"\n    output_type \"typescript\"\n\n    // Where the generated code will be saved (relative to baml_src/)\n    output_dir \"../\"\n\n    // The version of the BAML package you have installed (e.g. same version as your baml-py or @boundaryml/baml).\n    // The BAML VSCode extension version should also match this version.\n    version \"0.65.0\"\n\n    // Valid values: \"sync\", \"async\"\n    // This controls what `b.FunctionName()` will be (sync or async).\n    default_client_mode async\n}\n",
  "response.baml": "class Message {\n    vehicle VehicleInfo\n    message string\n}\nclass VehicleInfo {\n    id string\n    role string\n}\n\nfunction ExtractConversation(conversation: string) -> Message[] {\n    client \"openai/gpt-4o\"\n    prompt #\"\n        Extract the conversation from the following text:\n\n    {{ ctx.output_format }}\n\n        Conversation:\n        ------------\n        {{ conversation }}\n        ------------\n    \"#\n}\n\ntest extract_conversation {\n    functions [ExtractConversation]\n    args {\n        conversation #\"[\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_01\",\n      \"role\": \"not assigned\"\n    },\n    \"message\": \"Good day, fellow vehicles! This is Vehicle 01. Our current positions suggest the following order for optimal traffic flow: Vehicle 1, Vehicle 2, Vehicle 3. Each vehicle should maintain a safe following distance. Given my position at latitude 30.2672 and longitude -97.7431, I propose leading initially. Please confirm your agreement or suggest adjustments.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_02\",\n      \"role\": \"not assigned\"\n    },\n    \"message\": \"Hello everyone, this is Vehicle 02. I agree with Vehicle 01's proposed order. My current location at latitude 30.2680 and longitude -97.7435 supports this sequence. I suggest we set our speeds to maintain safe distances. Awaiting confirmation from Vehicle 03.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_03\",\n      \"role\": \"not assigned\"\n    },\n    \"message\": \"Greetings, this is Vehicle 03. I concur with the proposed order. My position at latitude 30.2688 and longitude -97.7439 is suitable for the third position. I am ready to adjust speed accordingly and maintain safe following distances.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_01\",\n      \"role\": \"leader\"\n    },\n    \"message\": \"Thank you for your cooperation. I will assume the role of leader, setting a speed of 20 to ensure optimal traffic flow and safety. Vehicle 02, please follow at a distance of 50 meters, and Vehicle 03, maintain a distance of 50 meters behind Vehicle 02.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_02\",\n      \"role\": \"follower\"\n    },\n    \"message\": \"Acknowledged, Vehicle 01. I will maintain a speed of 18 to ensure a safe distance of 50 meters from you. Vehicle 03, please ensure a similar distance from me. Let's optimize our flow through the upcoming traffic light cycle efficiently.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_03\",\n      \"role\": \"follower\"\n    },\n    \"message\": \"Understood, Vehicle 02. I will maintain a speed of 15 to keep a safe distance of 50 meters. This coordination should help us minimize stops and maintain a steady flow.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_01\",\n      \"role\": \"leader\"\n    },\n    \"message\": \"As the leader, I will monitor the traffic light phases closely. Currently, all vehicles are at a red phase with 20 seconds remaining. I will adjust speeds as necessary to time our approach optimally to the next green phase.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_02\",\n      \"role\": \"follower\"\n    },\n    \"message\": \"Copy that, Vehicle 01. I will be ready to adapt my speed and distance based on your adjustments to ensure we all pass safely and efficiently through the intersection.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_03\",\n      \"role\": \"follower\"\n    },\n    \"message\": \"Message received, Vehicle 01. I am prepared to adjust as instructed to maintain the optimal flow and ensure safety for all vehicles.\"\n  },\n  {\n    \"vehicle\": {\n      \"id\": \"CAV_01\",\n      \"role\": \"leader\"\n    },\n    \"message\": \"Excellent coordination, team. As the light turns green, I will increase my speed gradually to 25. Please adjust your speeds accordingly to maintain safe distances. Let's proceed safely and efficiently. Drive safely, everyone!\"\n  }\n]\"#\n    }\n}",
  "resume.baml": "// Defining a data model.\nclass Resume {\n  name string\n  email string\n  experience string[]\n  skills string[]\n}\n\n// Create a function to extract the resume from a string.\nfunction ExtractResume(resume: string) -> Resume {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"openai/gpt-4o\" // Set OPENAI_API_KEY to use this client.\n  prompt #\"\n    Extract from this content:\n    {{ resume }}\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n// Test the function with a sample resume. Open the VSCode playground to run this.\ntest vaibhav_resume {\n  functions [ExtractResume]\n  args {\n    resume #\"\n      Vaibhav Gupta\n      vbv@boundaryml.com\n\n      Experience:\n      - Founder at BoundaryML\n      - CV Engineer at Google\n      - CV Engineer at Microsoft\n\n      Skills:\n      - Rust\n      - C++\n    \"#\n  }\n}\n",
  "vehicle.baml": "class Vehilce {\n    id string\n    type string\n    currentSpeed int\n    location Coordinate\n    mass int\n    frontalArea int\n    enginePower int\n    drivelineEfficiency int\n    role string\n}\n\nclass Coordinate {\n    latitude int\n    longitude int\n}\n\n\n\nclass TrafficSignal {\n    id string\n    location Coordinate\n    currentPhase string\n    timeUntilNextPhase int\n    cycleTime int\n}\n\nclass RoadData {\n    speedLimit int\n    grade int\n    upstreamDistance int\n    downstreamDistance int\n}\n\nclass EnvironmentalData {\n    airDensity int\n    gravitationalAcceleration int\n}\n\nclass FinalResult {\n    vehicles Vehilce[]\n    trafficSignals TrafficSignal[]\n    roadData RoadData\n    environmentalData EnvironmentalData\n}\n\n\nfunction ExtractVehicleData(vehicleDatabase: string) -> FinalResult {\n    client \"openai/gpt-4o\"\n    prompt #\"\nExtract each vehicle's data from the following data table, look at the column headers to understand the data:\n        {{ ctx.output_format }}\n\n        Data Table:\n        ------------\n        {{ vehicleDatabase }}\n        ------------\n    \"#\n}\n\ntest extract_vehicle_data {\n    functions [ExtractVehicleData]\n    args {\n        vehicleDatabase #\"\n            |ID       |Type |Current Speed|Location                                    |Mass|Frontal Area|Engine Power|Driveline Efficiency|Current Phase|Time Until Next Phase|Cycle Time|Speed Limit|Grade|Upstream Distance|Downstream Distance|Air Density|Gravitational Acceleration|a0  |a1  |a2  |\n|---------|-----|-------------|--------------------------------------------|----|------------|------------|--------------------|-------------|---------------------|----------|-----------|-----|-----------------|-------------------|-----------|--------------------------|----|----|----|\n|CAV_01  |bus  |25           |{\"latitude\": 30.2672, \"longitude\": -97.7431}|2500|3.5         |250000      |0.8                 |red          |20                   |60        |15.56      |0.05 |300              |300                |1.226      |9.806                     |0.12|0.22|0.32|\n|CAV_02  |truck|30           |{\"latitude\": 30.2680, \"longitude\": -97.7435}|4000|5.0         |400000      |0.7                 |red          |25                   |70        |18.23      |0.08 |400              |400                |1.227      |9.807                     |0.14|0.24|0.34|\n|CAV_03  |car  |20           |{\"latitude\": 30.2688, \"longitude\": -97.7439}|2000|2.8         |200000      |0.9                 |red          |20                   |60        |13.89      |0.03 |200              |200                |1.225      |9.806                     |0.1 |0.2 |0.3 |\n|CAV_04  |bus  |25           |{\"latitude\": 30.2695, \"longitude\": -97.7443}|3000|4.2         |300000      |0.8                 |red          |25                   |70        |16.67      |0.06 |350              |350                |1.226      |9.807                     |0.13|0.23|0.33|\n|CAV_05  |truck|30           |{\"latitude\": 30.2702, \"longitude\": -97.7447}|5000|6.0         |500000      |0.7                 |red          |30                   |80        |20.0       |0.1  |500              |500                |1.227      |9.808                     |0.15|0.25|0.35|\n|CAV_06  |car  |20           |{\"latitude\": 30.2709, \"longitude\": -97.7451}|2500|3.0         |250000      |0.9                 |red          |20                   |60        |14.44      |0.04 |250              |250                |1.225      |9.806                     |0.11|0.21|0.31|\n|CAV_07  |bus  |25           |{\"latitude\": 30.2716, \"longitude\": -97.7455}|3500|4.5         |350000      |0.8                 |red          |25                   |70        |17.14      |0.07 |400              |400                |1.226      |9.807                     |0.14|0.24|0.34|\n|CAV_08  |truck|30           |{\"latitude\": 30.2723, \"longitude\": -97.7459}|6000|7.0         |600000      |0.7                 |red          |30                   |90        |21.87      |0.12 |600              |600                |1.227      |9.808                     |0.16|0.26|0.36|\n|CAV_09  |car  |20           |{\"latitude\": 30.2730, \"longitude\": -97.7463}|3000|3.5         |300000      |0.9                 |red          |20                   |60        |15.56      |0.05 |300              |300                |1.225      |9.806                     |0.12|0.22|0.32|\n|CAV_10  |bus  |25           |{\"latitude\": 30.2737, \"longitude\": -97.7467}|4500|5.0         |450000      |0.8                 |red          |25                   |70        |18.23      |0.08 |450              |450                |1.226      |9.807                     |0.15|0.25|0.35|\n\n        \"#\n    }\n}",
}
export const getBamlFiles = () => {
    return fileMap;
}