export function returnNotificationColor (string) {
    switch(string) {
        case("Deleted"): return "text-danger";
        case("Updated"): return "text-success";
        default: return "text-primary"
    }
}