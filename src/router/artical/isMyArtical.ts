import * as db from "../../db";

export default async (artical: any, user: any) => {
    const resArticals: any = await db.getUserArticals(user.id, artical)
    return resArticals && resArticals.length > 0
}