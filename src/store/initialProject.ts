import {CodePersistData} from "@/visualeditor/utils/persist";
import generateUUID from "@/visualeditor/utils/uuidGenerator";
import {ProjectStory} from "@/store/app";

export const ChimeDefault = {
    "modules": {
        "entry": {
            "nodeMap": {
                "$begin": {
                    "id": "$begin",
                    "name": "begin",
                    "position": {
                        "x": 48,
                        "y": 134
                    }
                },
                "d26dc45f-9045-051d-3c37-cff40fc7ee06": {
                    "id": "d26dc45f-9045-051d-3c37-cff40fc7ee06",
                    "name": "log",
                    "displayName": "log",
                    "position": {
                        "x": 311,
                        "y": 82
                    },
                    "data": {
                        "message": "Hello world !"
                    },
                    "space": "main"
                }
            },
            "connections": [
                {
                    "id": "ppSDFlSN",
                    "fromNodeId": "$begin",
                    "fromNodePinName": "$pin_exec_out",
                    "space": "main",
                    "toNodeId": "d26dc45f-9045-051d-3c37-cff40fc7ee06",
                    "toNodePinName": "$pin_exec_in"
                }
            ],
            "variable": {

            }
        }
    }
} as CodePersistData;

export  const newProject = {
    id: generateUUID(),
    name: "new project",
    description: "create for testing",
    category: {
        id: "a1b2c3d4-e5f6-4g7h-8i9j-0kl1m2n3o4p5",
        name: "Testing Case",
        color: "#3498db",
        image: "webdev.jpg"
    },
    chime: ChimeDefault,
    image: "portfolio-redesign.jpg",
    link: "https://example.com/portfolio-redesign"
} as ProjectStory