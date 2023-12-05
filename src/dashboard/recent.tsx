import React from 'react'

export default function Recent(props: { img: string, message: string }) {
    const [show, setShow] = React.useState(false)

    return (
        <div className={"relative"} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            .<img className="h-auto max-w-full rounded-lg" src={props.img} alt=""/>
            {
                show &&
                <div
                    className={"absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#20232a] to-transparent rounded-lg"}>
                    <div className={"flex flex-col justify-end h-full p-2"}>
                        <p>{props.message}</p>
                    </div>
                </div>
            }

        </div>
    )
}
