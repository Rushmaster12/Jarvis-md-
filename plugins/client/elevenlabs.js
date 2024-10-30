const axios = require("axios");
const { ELEVENLABS } = require('../../config');

async function elevenlabs(match) {  
  const aittsid = await axios.get("https://gist.githubusercontent.com/Loki-Xer/6e601a0992fa5bc920e4b94f771ec129/raw")
  const labsVoiceID = aittsid.data;
  let response = {};
  for(key in labsVoiceID) {
    if(match.split(/[|,;]/)[1].toLowerCase().trim() == key){
    let v_key = labsVoiceID[key]["voice_id"];
    const voiceURL = `https://api.elevenlabs.io/v1/text-to-speech/${v_key}/stream`;
    
    response = await axios({
          method: "POST",
          url: voiceURL,
          data: {
            text: match.split(/[|,;]/)[0].trim(),
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
            model_id: "eleven_monolingual_v1",
          },
          headers: {
            Accept: "audio/mpeg",
            "xi-api-key": (ELEVENLABS || '2a0050b5932ff8d79f54418fa370d1c1'),
            "Content-Type": "application/json",
          },
          responseType: "stream"
        });
        break;
      }
    }
    return response.data;
  }

module.exports = {
  elevenlabs
};
