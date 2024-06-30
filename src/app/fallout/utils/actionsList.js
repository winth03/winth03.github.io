export const ACTION_LIST = [
    {
        action: "Attack",
        apCost: "Dependent on the weapon",
        description: "You can make an attack with a weapon you are holding or using, the AP cost is dependent on the weapon."
    },
    {
        action: "Dodge",
        apCost: "6",
        description: "You prepare to move quickly out of the way of an attack or explosion. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker. Additionally, you can move up to 15 feet in reaction to any other creature's action one time before the start of your next turn. You lose this benefit if you are dying or you cannot spend AP to move."
    },
    {
        action: "Equip a weapon",
        apCost: "3",
        description: "You take a weapon from your inventory and prepare to attack with it with any hands you have free. If you have a weapon in your hands already and have not stowed it, you drop it on the ground."
    },
    {
        action: "Escape a Grapple",
        apCost: "5",
        description: "If you are grappled, you make a contested Strength or Agility check against your grapplers Strength check to escape."
    },
    {
        action: "Grapple",
        apCost: "3",
        description: "You use your appendages to hold someone in place, you must contest a Strength check against their Strength or Agility."
    },
    {
        action: "Help",
        apCost: "6",
        description: "You can lend your aid to another creature in the completion of a task. When you use your AP to Help, the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn. Alternatively, you can aid a friendly creature in attacking a creature within 5 feet of you. You feint, distract the target, or in some other way team up to make your ally’s attack more effective. If your ally attacks the target before your next turn, the first attack roll is made with advantage."
    },
    {
        action: "Hide",
        apCost: "6",
        description: "When you take the Hide action, you make a Sneak check with the DC equal to any nearby enemies passive sense scores. In order to hide you must be heavily obscured or within full cover. You are hidden from any enemies that have a lower passive sense compared to your sneak roll. If you succeed, you gain certain benefits, as described in the “Unseen Attackers and Targets” section. While hiding, you are acting unpredictably to confuse your enemy. Enemies still know your general location and can move to try and make line of sight again to notice you. If you are no longer within full cover of an enemy you are hidden from, you are no longer hidden."
    },
    {
        action: "Interact with an object",
        apCost: "3",
        description: "Interacting with an object falls under many categories of things you can do.\n● openorclose a door\n● pickupadropped shiv\n● takeabottle cap from a table\n● pushing a button\n● extinguish a small flame\n● donamask\n● pull the hood of your jacket up and over your head\n● putyour ear to a door\n● kickasmall stone\n● turnakey in a lock\n● hand an item to another character\nRead the above section about action points if you need references on how many action points an improvised action may cost."
    },
    {
        action: "Move 5 feet",
        apCost: "1",
        description: "You move 5 feet in any direction so long as your movement isn’t impeded or the area isn’t difficult terrain."
    },
    {
        action: "Ready",
        apCost: "+2",
        description: "You prepare an action with a trigger. You must specify what the trigger is and spend the necessary AP with an additional 2 AP. When the trigger occurs, you may perform the action. You cannot perform the action on a different trigger, nor do you regain the AP if the trigger never occurs."
    },
    {
        action: "Reload",
        apCost: "6",
        description: "You use the necessary ammunition to reload your weapon."
    },
    {
        action: "Search",
        apCost: "3",
        description: "You make an active perception check to look for someone or something hidden."
    },
    {
        action: "Shove",
        apCost: "4",
        description: "You knock a target prone or push it away from you. The target must be no more than one size larger than you and must be within your reach. Instead of making an attack roll, you make an Unarmed check contested by the target’s Unarmed check or Agility check (the target chooses the ability to use). If you win the contest, you either knock the target prone or push it 5 feet away from you."
    },
    {
        action: "Sprint",
        apCost: "5",
        description: "You can spend 5 action points on your turn to sprint. When you sprint, you move 50 feet in a line. If you stop or are obstructed before you move 50 feet, your movement ends and you do not regain any action points."
    },
    {
        action: "Stand up from Prone",
        apCost: "5",
        description: "You stand back up from being prone."
    },
    {
        action: "Stow a weapon",
        apCost: "3",
        description: "You take a weapon you are holding and put it into your inventory."
    },
    {
        action: "Take Cover",
        apCost: "3",
        description: "If you only have three quarters or half cover, you can spend 3 AP to squat, kneel, or duck into cover to gain full cover. If you attack while taking cover, you no longer have full cover."
    },
    {
        action: "Unarmed Strike",
        apCost: "3",
        description: "You punch, kick, jab, slap, or perform any kind of attack to another creature within 5 feet of you."
    },
    {
        action: "Use a Chem",
        apCost: "4",
        description: "When you take this action, you take the chem out of your inventory and use it. You don’t need to interact with the object or equip the chem in order to use it."
    },
    {
        action: "Custom Action",
        apCost: "Dependent on the action",
        description: "If you want to do something that isn’t listed here, you can ask the GM if it is possible and how many AP it will cost. The GM will determine the action cost based on the difficulty of the action."
    }
];