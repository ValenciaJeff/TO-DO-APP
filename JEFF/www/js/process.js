"use strict";

var Trans = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
  displayName: "TodoList",

  getInitialState: function getInitialState() {
    return { list: [], show: false };
  },
  addTodo: function addTodo() {
    var todo = $("#addedTodo").val();
    //console.log(todo)
    if (todo && todo.length > 0) {
      var list = this.state.list.push(todo);this.setState({ list: this.state.list });
    }
    this.dynamicEntry();
    return true;
  },
  delete: function _delete(i) {
    this.state.list.splice(i, 1);
    return this.setState({ list: this.state.list });
  },
  dynamicEntry: function dynamicEntry() {
    $("#addedTodo").val("");
    return this.setState({ show: !this.state.show });
  },
  render: function render() {

    return React.createElement(
      "div",
      { id: "todolist" },
      React.createElement(
        Trans,
        { transitionName: "moveup", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
        !this.state.show ? React.createElement(
          "button",
          { className: "btn-floating btn-large waves-effect waves-light", onClick: this.dynamicEntry, id: "show", key: "show" },
          React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" })
        ) : React.createElement(
          "div",
          { id: "addtodo_area", key: "todoarea" },
          React.createElement(
            "button",
            { className: "btn-floating btn-large waves-effect waves-light", onClick: this.addTodo },
            React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true", id: "addbutton" })
          ),
          React.createElement("input", { type: "text", id: "addedTodo" })
        )
      ),
      React.createElement(
        "div",
        { id: "displaytodo_list" },
        React.createElement(
          "p",
          { id: "today" },
          "TODAY"
        ),
        React.createElement(
          "ul",
          null,
          React.createElement(
            Trans,
            { transitionName: "slideIn", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
            this.state.list.map(function (todo, i) {
              return React.createElement(
                "li",
                { key: todo + i, onClick: this.delete.bind(null, i), className: "animated swing bounce" },
                todo
              );
            }.bind(this))
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(TodoList, null), document.getElementById("space"));