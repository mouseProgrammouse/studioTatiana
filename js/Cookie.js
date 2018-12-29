/**
 * This class uses for manipulating with cookie
 */
// Constructor function
function Cookie() {

    /**
     * Method that stores the name and value cookie
     *
     * cname - name of the cookie
     * cvalue - value of that cookie
     * exdays - the number of days until the cookie should expire
     */
    this.setCookie = function (cname, cvalue, exdays) {
        // uses a Date object for manipulating with date
        var d = new Date();
        // calculated time in milliseconds
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // set cookie name, cookie value and expire days
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    /**
     * Method that return the value of cookie by its name
     * "" return by default
     *
     * cname - name of the cookie
     */
    this.getCookie = function (cname) {
        var name = cname + "=";
        // decodes a URI component
        var decodedCookie = decodeURIComponent(document.cookie);
        // split a string into an array of substrings,
        // ";" is used as the separator
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            // if the cookie is found
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        // return "" if cookie is not founded
        return "";
    };
}
