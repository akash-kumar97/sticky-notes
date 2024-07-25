/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);

    const textAreaRef = useRef(null);


    let mouseStartPos = { x: 0, y: 0 };

    const cardRef = useRef(null);

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        };

        //update start position for next move
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        //update card top and left position
        setPosition({
            x: cardRef.current.offsetLeft - mouseMoveDir.x,
            y: cardRef.current.offsetTop - mouseMove.y,
        })
    }

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }

    useEffect(() => {
        autoGrow(textAreaRef);
    }, [])

    const autoGrow = (textAreaRef) => {
        const { current } = textAreaRef;
        current.style.height = "auto";//reset the height
        current.style.height = current.scrollHeight + "px";
    }


    return (
        <div
            className="card"
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            ref={cardRef}
        >
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
                onMouseDown={mouseDown}
            >
                <Trash />
            </div>
            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onInput={() => autoGrow(textAreaRef)}
                ></textarea>
            </div>
        </div >
    )
}

export default NoteCard