import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        let res = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + event?.context?.params?.word)
        return res.data
    } catch(e) {
        return {
            _isError: true
        }
    }
})