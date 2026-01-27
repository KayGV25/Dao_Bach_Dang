export type GraphStructure = {
    title: string,
    composed_of?: Array<GraphStructure | string>,
    img?: string,
    name?: string
}

export const STRUCTURE_GRAPH: GraphStructure = {
    "title": "Đạo Bạch Đằng",
    "composed_of": [
        {
            "title": "Liên đoàn Bạch Đằng",
            "composed_of": [
                "Bầy Bạch Đằng",
                "Thiếu đoàn Bạch Đằng",
                "Kha đoàn Bạch Đằng"   
            ]
        },
        {
            "title": "Liên đoàn Nữ Bạch Đằng",
            "composed_of": [
                "Bầy Nữ Bạch Đằng",
                "Bầy Thủy Nguyên",
                "Thiếu đoàn Nữ Bạch Đằng",
                "Kha đoàn Bạch Đằng",
                "Kha đoàn Thủy Nguyên"
            ]
        },
        {
            "title": "Liên đoàn Vân Cừ",
            "composed_of": [
                "Bầy Vân Cừ",
                "Thiếu đoàn Vân Cừ",
                "Kha đoàn Vân Cừ"
            ]
        },
        {
            "title": "Tráng đoàn Bạch Đằng"
        }
    ]
}

export const TITLE_GRAPH_FIRST_PART: GraphStructure = {
    "title": "Đạo Trưởng",
    "name": "Tr. Võ Quang Nguyên Phổ",
    "img": "",
    "composed_of": [
        {
            "title": "Đạo Phó",
            "name": "Tr. Vũ Quang Phúc",
            "img": "/vqp.jpg"
        }, 
        {
            "title": "Đạo Phó",
            "name": "Tr. Trương Văn Minh",
            "img": ""
        }, 
    ]
}

export const TITLE_GRAPH_SECOND_PART: Array<Array<GraphStructure>> = [
    [{
        "title": "Liên đoàn Trưởng Bạch Đằng",
        "name": "Tr. Trương Bá Thắng",
        "img": ""
    },
    {
        "title": "Liên đoàn Trưởng Nữ Bạch Đằng",
        "name": "Tr. Nguyễn Thị Hoàng Oanh",
        "img": "/ntho.jpg"
    },
    {
        "title": "Liên đoàn Trưởng Vân Cừ",
        "name": "Tr. Lê Đức Toàn",
        "img": ""
    }],
    [{
        "title": "Ủy Viên Ngành Ấu",
        "name": "Tr. Nguyễn Ngọc Quyên",
        "img": "/nnq.jpg"
    },
    {
        "title": "Ủy Viên Ngành Thiếu",
        "name": "Tr. Nguyễn Lê Khánh Hằng",
        "img": "/nlkh.jpg"
    },
    {
        "title": "Ủy Viên Ngành Kha",
        "name": "Tr. Lý Nam",
        "img": ""
    },
    {
        "title": "Ủy Viên Ngành Tráng",
        "name": "Tr. Trương Văn Minh",
        "img": ""
    }]
]