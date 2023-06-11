import { Component } from "react";

interface ButtonProps {
  title: string;
  onClick(): void;
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <button className="Button" onClick={this.props.onClick}>
        {this.props.title}
      </button>
    );
  }
}
export default Button;
