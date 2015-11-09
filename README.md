# Jsdate
Extension of javascript Date object.

This is my first Github project, so please be patient, and nice to me...

I wrote the base of this code in about 2011 when I needed a way to handle days that have  more than 24 hours, which can occur within some businesses where it is important to keep time stamps relative to an administrative date.

For example, the time 25:30 September 1st, is the same as 01:30 September 2nd, but administrative belongs to 1st. While handling those dates you dont only need to know the timestamp (unix or javascript), you also need the "dutydate", or the administrative date. This extension handles this.

As a bonus I wrote some handy features, as String to date, String to time and PHP-like format functions.

