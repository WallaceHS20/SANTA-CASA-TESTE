import { classNames } from "primereact/utils"
import { Form } from "react-bootstrap"

interface Props {
    message?: React.ReactNode
    type?: "invalid" | "valid" | "info"
    className?: string
}

export const Feedback = ({ message, className, type = "invalid" }: Props) => {
    const ennableFallback = !!message
    const showFallback = classNames(ennableFallback ? "d-block" : "d-none", className)
    return (
        ennableFallback && (
            <Form.Control.Feedback
                type={type === "info" ? undefined : type}
                className={showFallback}
            >
                {message}
            </Form.Control.Feedback>
        )
    )
}