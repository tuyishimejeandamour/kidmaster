import { motion } from "framer-motion"

export  default  function CarouselItem({ index }:{index:number}) {

    const itemVariants = {
        1: {
            x: "-100%",
            y: "-5%",
            scale: 1.5,
            blur: "30px",
            opacity: 0
        },
        2: {
            x: 0,
            blur: 0,
            opacity: 1
        },
        3: {
            x: "50%",
            y: "10%",
            scale: 0.8,
            blur: "10px"
        },
        //...
    }

    return (
        <motion.div
            className="item"
            variants={itemVariants}
            animate={`${index}`}
            transition={{
                type: "tween",
                duration: 0.5
            }}
        >
            <Content />
        </motion.div>
    )
}

function Content() {

    const textVariants = {
        hidden: {
            y: -30,
            opacity: 0,
            blur: "10px"
        },
        show: {
            y: 0,
            opacity: 1,
            blur: 0
        }
    }

    return (
        <motion.div
            variants={textVariants}
            initial="hidden"
            animate="show"
            transition={{
                duration: 0.5,
                delay: 1
            }}
        >
            <h2>Slide Title</h2>
            <p>Slide description</p>
        </motion.div>
    )

}
