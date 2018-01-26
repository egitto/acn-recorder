# acn-recorder
## Use:
1. clone this repo

2. cd into it, run `npm install`

3. if you're not ex cinera, edit `serversToLog` in `index.js` to reflect your needs

4. put your user token in `token`, except don't, because that would violate discord's TOS (bots have to go in through the bot API (they don't care unless you're making lots of API calls though, and this, isn't))

4. run `npm start`, or set up a script or cron job to do it for you in case it fails

5. periodically check the log files