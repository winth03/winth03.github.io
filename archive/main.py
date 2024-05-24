from random import randint


def roll_dice(number, sides, modifier=0, advantage=False, disadvantage=False):
    results = []

    if advantage and disadvantage:
        return roll_dice(number, sides, modifier)
    if advantage:
        die_results = []
        for _ in range(2):
            result = roll_dice(number, sides, modifier)
            results.append(result[0])
            die_results.append(result)
        return (max(results), die_results)
    elif disadvantage:
        die_results = []
        for _ in range(2):
            result = roll_dice(number, sides, modifier)
            results.append(result[0])
            die_results.append(result)
        return (min(results), die_results)
    else:
        for _ in range(number):
            results.append(randint(1, sides))
    return (sum(results) + modifier, results)


def main():
    roll = input("Roll : ")
    die = roll.split("d", 1)
    number = int(die[0])
    advantage = "adv" in die[1]
    disadvantage = "dis" in die[1]

    # Remove advantage/disadvantage from die[1]
    print(die[1])
    die[1] = die[1].replace("adv", "").replace("dis", "")
    print(die[1])

    # Check if there is a modifier
    if "+" in die[1]:
        die = die[1].split("+")
        sides = int(die[0])
        modifier = int(die[1])
    elif "-" in die[1]:
        die = die[1].split("-")
        sides = int(die[0])
        modifier = int(die[1])
    else:
        sides = int(die[1])
        modifier = 0

    print("Rolling " + str(number) + "d" + str(sides) + " + " + str(modifier))
    result = roll_dice(number, sides, modifier, advantage, disadvantage)
    print("Result: " + str(result))


if __name__ == "__main__":
    main()
