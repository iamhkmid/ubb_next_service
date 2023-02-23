import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  footerInfo: async (_, { footerInfoId, group, label }, { db }) => {
    if (!!footerInfoId) {
      const findFooterInfo = await db.footerInfo.findUnique({
        where: { id: footerInfoId!, label: label! },
        include: { Group: true }
      })
      return findFooterInfo ? [{ ...findFooterInfo, imageUrl: `${process.env.BASE_URL}${findFooterInfo.image}`.replace(/\\/g, '/') }] : []
    } else if (!!group) {
      const findGroup = await db.footerInfoGroup.findUnique({ where: { name: group }, select: { id: true, FooterInfos: { include: { Group: true } } } })
      return findGroup?.FooterInfos.map((footer) => {
        const { image, ...rest } = footer
        return { ...rest, imageUrl: `${process.env.BASE_URL}${footer.image}`.replace(/\\/g, '/') }
      }) || []
    } else {
      const findGroup = await db.footerInfo.findMany({ include: { Group: true } })
      return findGroup.map((footer) => {
        const { image, ...rest } = footer
        return { ...rest, imageUrl: `${process.env.BASE_URL}${footer.image}`.replace(/\\/g, '/') }
      }) || []
    }
  }
};

export const Mutation: MutationResolvers = {
  updateFooterInfo: async (_, { data }, { db }) => {
    return await db.footerInfo.update({
      where: { id: data?.footerInfoId },
      data: {
        label: data?.label || undefined,
        value: data?.value || undefined
      }
    })
  }
}