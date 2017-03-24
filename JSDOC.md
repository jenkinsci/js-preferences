# Browser Configuration

This preferences package uses browser 
[`localStorage`](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)
for storing log settings. You need to use the browser "Storage Inspector" to discover 
and configure the different preferences. Of course, it's also possible to use the Developer 
Console in any browser to programmatically set each preference via 
the [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage).

Configuring properties in the Storage Inspector of any of the Browsers is a simple process 
of locating the key for the preference of interest (all log preference keys have a "`jenkins-instance/preferences:`" prefix) 
and changing it's value to the desired value.

