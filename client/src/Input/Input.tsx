import React, { useId, useState } from "react";
import "./Input.scss";

const Input = (props: Props) => {
    const [showLegend, setShowLegend] = useState(false);
    const id = useId();

    const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(target.value)
        props.setError("");

        if (!target.value) setShowLegend(false);
    }

    return (
        <div className="input-container">
            <fieldset className="fieldset">

            {(props.value || showLegend) && <legend>{props.name}</legend>}
            {(!props.value && showLegend) && <h3 className="input-legend">{props.name}</h3>}
            <input 
                id={id}
                value={props.value}
                type={props.type}
                onChange={onChange}
                placeholder={!showLegend ? props.name : ""}
                className="input"
                onBlur={() => setShowLegend(false)}
                onFocus={() => setShowLegend(true)}
                />
            </fieldset>
            {props.error && <p className="field-error">{props.error}</p>}
        </div>
    )
}

type Props = {
    value?: string,
    setValue: Function,
    type: string,
    name: string,
    error?: string,
    setError: Function
}

export default Input;