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