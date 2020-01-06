import numpy as np
ALPHA = 0.001

weights_0_1 = 2*np.random.random((30, 2))
weights_1_2 = 2*np.random.random((30, 2))
hidden_l_size = 20
dropout_mask = np.random.randint(2, size=20)


def initWeights(size):
    global weights_0_1
    global weights_1_2
    global hidden_l_size
    global dropout_mask
    hidden_l_size = size
    dropout_mask = np.random.randint(2, size=hidden_l_size)
    weights_0_1 = .002*np.random.random((size, hidden_l_size))-0.01
    weights_1_2 = .2*np.random.random((hidden_l_size, 1))-0.1
    # print(weights)


def relu(x):
    return (x > 0)*x


def relu2div(x):
    return x > 0


def tanh(x):
    return np.tanh(x)


def tanh2deriv(x):
    return 1 - (x**2)


def softmax(x):
    temp = np.exp(x)
    return temp / np.sum(temp, axis=1, keepdims=True)


def trainData(inputs, goals):
    global weights_0_1
    global weights_1_2
    for j in range(3000):
        for i in range(len(inputs)):
            # print('=========')
            layer_0 = np.array(inputs[i:i+1])
            # print(layer_0)
            goal = goals[i]
            # print('goal:\t', goal)
            # print('weight:\t', weights)
            layer_1 = np.dot(layer_0, weights_0_1)

            # print('layer_1', layer_1)
            layer_1 = tanh(layer_1)
            dropout_mask = np.random.randint(2, size=layer_1.shape)
            layer_1 *= dropout_mask*2
            # print('layer_1 relus:', layer_1)
            layer_2 = softmax(np.dot(layer_1, weights_1_2))
            # print('layer_1:\t', layer_1, goal, layer_1-goal, (layer_1 - goal)**2)
            # error = np.sum((layer_1 - goal)**2)
            # print('ERROR:', error)
            delta_2 = (layer_2 - goal)
            # print(delta_2, weights_1_2)
            delta_1 = delta_2.dot(weights_1_2.T)*tanh2deriv(layer_1)
            delta_1 *= dropout_mask
            # print('delta:\t', delta)
            weights_1_2 -= ALPHA * layer_1.T.dot(delta_2)
            weights_0_1 -= ALPHA * layer_0.T.dot(delta_1)


def pred(data):
    return np.dot(relu(np.dot(data, weights_0_1)), weights_1_2)


def main():
    # print(weights_0_1)
    print('default')


if __name__ == "__main__":
    main()
