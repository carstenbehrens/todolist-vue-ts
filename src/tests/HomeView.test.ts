import { mount } from "@vue/test-utils";
import HomeView from "../views/HomeView.vue";
import { describe, test, expect } from "vitest";
import { createPinia } from "pinia";

describe("HomeView", () => {
  test("should be able to add and complete todos", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
      },
    });
    const todoInput = wrapper.find("[data-testid='todo-input']"); // Find the todo input
    const addTodoButton = wrapper.find("[data-testid='todo-add-button']"); // Find the add todo button

    // Create the two todos
    await todoInput.setValue("First Todo");
    await addTodoButton.trigger("click");
    await todoInput.setValue("Second Todo");
    await addTodoButton.trigger("click");

    const todos = wrapper.findAll("[data-testid='todo-item']"); // Find all open todo items

    // Check if there are two open todos
    expect(todos.length).toBe(2);

    // Check the first todo
    await todos.at(0)?.setValue("checked");
    const doneTodos = wrapper.findAll("[data-testid='todo-item-done']"); // Find all done todo items

    // Check if there is one done todo
    expect(doneTodos.length).toBe(1); // Check if there is one done todo
    expect(wrapper.findAll("[data-testid='todo-item']").length).toBe(1); // Should still have one open todo
  });
});
