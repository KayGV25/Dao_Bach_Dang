export type GraphStructure = {
    title: string,
    composed_of?: Array<GraphStructure | string>
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

export const TITLE_GRAPH = {

}
