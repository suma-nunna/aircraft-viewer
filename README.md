# time:matters Angular Challenge

## Introduction
This is a our short coding challenge in Angular to get some more insights about your coding skills. The given task should be handleable within 1-2 hours. 

> Our focus: We're looking for code that is **clean**, **readable** and **maintainable**. 

If you have any questions feel free to contact us:
- Joachim / joachim.roppert@time-matters.com
- Sascha / sascha.kurr@time-matters.com

# The task

Fork that repository, create an *Angular based* project, preferably with Angular Material components, and implement a little application. We want to access aircraft data of an API (see link at the end) and show that in a nice way in the browser.
You can search with it either for aircrafts by their registration code and get some details about the plane itself or search by their callsigns to get more information about their routing.

### Requirements
* A form with two elements
  * A switch (e.g. a radio box) to define the search type (aircraft/callsign)
  * An input field to enter 1-n values (there should be a way to search multiple values at once)
* Some (basic) error handling for non-existing values (or other responses from the API)
* Visual representation of the results in a way you think it makes sense, be creative!

You find more about the (free and not limited) API in here:
https://www.adsbdb.com/

We don't care (in that challenge) about perfect designs, mobile optimization or handling every single error response/user input.
We care more about your code and the way you work(ed) on that task.

Don't get lost by moving the visuals in a perfect way with perfect colors.

Focus on the core.
And enjoy!

### API calls
* Aircraft: https://api.adsbdb.com/v0/aircraft/[MODE_S || REGISTRATION]
  * "mode_s": A7A41D, 3829A8, A97A36
  * "registration": N59142, F-BKNI, N71FE

* Callsign: https://api.adsbdb.com/v0/callsign/[CALLSIGN]
  * "callsign": TAI567, EVA6606, SVA2400