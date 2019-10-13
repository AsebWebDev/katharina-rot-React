export const parallaxDataGalleryLeft = [
    {
        start: "self",
        startOffset: "",
        end: "self",
        endOffset: "50vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: -18,
                endValue: 10,
                property: "translateX",
                unit: "vw"
            },
            {
            startValue: 1,
            endValue: 8,
            property: "translateY",
            unit: "vw"
            },
            {
            startValue: 0.5,
            endValue: 1,
            property: "brightness",
            unit: ""
            },
            {
            startValue: 0.2,
            endValue: 1,
            property: "opacity",
            unit: ""
            }    
        ]
    },
    {
        start: "self",
        startOffset: "50",
        end: "self",
        endOffset: "90vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 1,
                endValue: 1.5,
                property: "scale",
                unit: "vw"
            },

        ]
    },
    {
        start: "self",
        startOffset: "90vh",
        end: "self",
        endOffset: "100vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 10,
                endValue: -18,
                property: "translateX",
                unit: "vw"
            },
            {
                startValue: 1.5,
                endValue: 1,
                property: "scale",
                unit: "vw"
            },
            {
                startValue: 1,
                endValue: 0.5,
                property: "brightness",
                unit: ""
            },
            {
                startValue: 1,
                endValue: 0.2,
                property: "opacity",
                unit: ""
            }  
        ]
    }
];

export const parallaxDataGalleryRight = [
    {
        start: "self",
        startOffset: "",
        end: "self",
        endOffset: "60vh",
        easing: "easeInSine",
        properties: [
            {
            startValue: 18,
            endValue: -7,
            property: "translateX",
            unit: "vw"
            }
        ]
    },
    {
        start: "self",
        startOffset: "",
        end: "self",
        endOffset: "80vh",
        easing: "easeInSine",
        properties: [
            {
            startValue: 0,
            endValue: 1,
            property: "opacity",
            unit: ""
            },
            {
            startValue: -7,
            endValue: 15,
            property: "translateY",
            unit: "vw"
            },
        ]
    }
];