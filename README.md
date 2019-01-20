# vuex-easy

This library provides the easiest way possible to manage state in a Vue application.
It acts as a layer above the VueX library, making it unnecessary to implement any mutations.
It is based on the React libraries redux-easy and context-easy.

It does not support actions, because those are never needed anyway.
Any asynchronous processing, such as calling a REST service,
can always be done in an event handling method instead of an action.
If common event handling code is needed across multiple components,
that can be implemented as a plain function
that is imported into each of the components
and invoked from their event handling methods.

To see mutation details, open the Vue devtools, select a mutation, and scroll to "mutation" on the right side.
The "type" shows the name of the mutation and the "payload" shows the data supplied to it.
