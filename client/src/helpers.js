import $ from "jquery";

export function returnNotificationColor (string) {
    switch(string) {
        case("Deleted"): return "text-danger";
        case("Updated"): return "text-success";
        default: return "text-primary"
    }
}

export function returnNotificationSymbol (string) {
    switch(string) {
        case("Deleted"): return "trash";
        case("Updated"): return "check-circle";
        case("Created"): return "plus-circle";
        default: return "envelope"
    }
}

export function calcFont (length) {
    switch(true) {
        case length < 10: return "2.5rem"; 
        case length > 29: return "1rem"; 
        default: return "1.4rem"
    }
}

export function calcCoverflow (width) {
    switch(true) {
        case width > 1200: return "3"; 
        case width <= 1200 && width > 900 : return "2.8"; 
        case width <= 900 && width > 765 : return "2.5"; 
        case width <= 765 && width > 360 : return "2"; 
        case width <= 360 : return "1.7"; 
        default: return "1"
    }
}

export function checkMobile () {
    return ($(window).width() <= 361) ? true : false
}

export function checkFullScreen () {
    return ($(window).width() > 1400) ? true : false
}

export function isInQuery(item, query) {
    return (
            ( item.title && item.title.toLowerCase().includes(query.toLowerCase()) )                    // check title for query 
        ||  ( item.tags  && item.tags.map(item => item.toLowerCase()).includes(query.toLowerCase()) )   // check tags for query
    )
} 