import Reply from '../../../models/reply'

export const getReply = async (title: string) => {
  const reply = await Reply.findOne( { title } );
  return reply;
}