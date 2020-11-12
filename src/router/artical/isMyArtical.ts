import * as db from "../../db";

export default async (articalParam: any, user: any) => {
    const resArticals: any = await db.getArticals(articalParam)
    return resArticals[0]?.user === user.id
}