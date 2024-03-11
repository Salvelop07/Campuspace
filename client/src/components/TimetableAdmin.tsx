import React, { FormEvent } from 'react'
import { CardWithForm } from './CardWithForm'

interface BodyInterface {
    course: string,
    semester: string,
    classes: ClassInterface[]
}

export interface ClassInterface {
    teacher: string,
    paperId: string,
    subject: string,
    allotedRoom: string,
    allotedTime: string,
    day: string
}

function TimetableAdmin() {
    const [body, setBody] = React.useState<BodyInterface>({
        course: "",
        semester: "",
        classes: [
            {
                allotedRoom: "",
                allotedTime: "",
                teacher: "",
                paperId: "",
                subject: "",
                day: ""
            }
        ]
    })
    function IncreaseClasses() {
        const classes = [...body.classes, {
            allotedRoom: "",
            allotedTime: "",
            teacher: "",
            paperId: "",
            subject: "",
            day: "Monday"
        }]
        setBody({
            ...body,
            classes
        })
    }
    function DecreaseClasses() {
        if (body.classes.length === 1) return
        const classes = body.classes.splice(0, body.classes.length - 1)
        setBody({
            ...body,
            classes
        })
    }
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }
    function setDayValue(value: string, index: number) {
        if(index === -1) return console.log("Index not found")
        setBody({
            ...body,
            classes: body.classes.map((cls) => {
                if(cls === body.classes[index]){
                    cls.day = value
                }
                return cls
            })
        })
    }
    function handleClassChange(e: React.ChangeEvent<HTMLInputElement>) {
        const index = e.target.parentElement?.parentElement?.dataset.index
        if (!index) return console.log("Index not found")
        setBody({
            ...body,
            classes: body.classes.map((cls, i) => {
                if (i === parseInt(index?.toString())) {
                    return {
                        ...cls,
                        [e.target.name]: e.target.value
                    }
                }
                return cls
            })

        })
    }

    return (
        <>
            <CardWithForm course={body.course} semester={body.semester} classes={body.classes} handleChange={handleChange} handleSubmit={handleSubmit} IncreaseClasses={IncreaseClasses} DecreaseClasses={DecreaseClasses} handleClassChange={handleClassChange} setDayValue={setDayValue} />
        </>
    )
}

export default TimetableAdmin