interface Props {
    title: string;
    userImage: string;
    userName: string;
    time: string;
    comment: string;
    replies: Array<{
        userImage: string;
        userName: string;
    }>

}

export default function Comment({comment}: { comment: Props }) {
    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                     src={comment.userImage}
                     alt=""/>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>Sarah</strong> <span className="text-xs text-gray-400">{comment.time}</span>
                <p className="text-sm">
                    {comment.comment}
                </p>
                <div className="mt-4 flex items-center">
                    <div className="flex -space-x-2 mr-2">
                        {comment.replies.map((reply, index) => (
                            <img key={index} className="rounded-full w-6 h-6 border border-white"
                                 src={reply.userImage}
                                 alt=""/>
                        ))}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">
                        5 Replies
                    </div>
                </div>
            </div>
        </div>
    )
}