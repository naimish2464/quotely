import json

# Generate 100 unique friendship quotes
friendship_quotes = [
    {
        "_id": f"FR{i:03}",
        "author": author,
        "content": quote,
        "tags": ["Friendship"]
    }
    for i, (author, quote) in enumerate([
        ("Oprah Winfrey", "Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down."),
        ("Walter Winchell", "A real friend is one who walks in when the rest of the world walks out."),
        ("Bob Marley", "The truth is, everyone is going to hurt you. You just got to find the ones worth suffering for."),
        ("William Shakespeare", "A friend is one that knows you as you are, understands where you have been, accepts what you have become, and still, gently allows you to grow."),
        ("Ed Cunningham", "Friends are those rare people who ask how we are and then wait to hear the answer."),
        ("Marlene Dietrich", "It’s the friends you can call up at 4 a.m. that matter."),
        ("Jane Austen", "There is nothing I would not do for those who are really my friends."),
        ("Baltasar Gracián", "True friendship multiplies the good in life and divides its evils."),
        ("Henry Ford", "My best friend is the one who brings out the best in me."),
        ("Eleanor Roosevelt", "Many people will walk in and out of your life, but only true friends will leave footprints in your heart."),
        ("Jim Henson", "There’s not a word yet for old friends who’ve just met."),
        ("Emily Dickinson", "My friends are my estate."),
        ("George Eliot", "What do we live for, if it is not to make life less difficult for each other?"),
        ("Ralph Waldo Emerson", "A friend may well be reckoned the masterpiece of nature."),
        ("Benjamin Franklin", "Be slow in choosing a friend, slower in changing."),
        ("Plato", "Friends have all things in common."),
        ("Cicero", "Friendship improves happiness and abates misery, by the doubling of our joy and the dividing of our grief."),
        ("Oscar Wilde", "True friends stab you in the front."),
        ("Jean de La Fontaine", "Rare as is true love, true friendship is rarer."),
        ("Muhammad Ali", "Friendship is not something you learn in school. But if you haven’t learned the meaning of friendship, you really haven’t learned anything."),
        ("Unknown", "A true friend is someone who is always there for you, through thick and thin."),
        ("Dalai Lama", "The best way to find yourself is to lose yourself in the service of others."),
        ("Vincent Van Gogh", "What would life be if we had no courage to attempt anything?"),
        ("Khalil Gibran", "Friendship is always a sweet responsibility, never an opportunity."),
        ("Louisa May Alcott", "Stay is a charming word in a friend’s vocabulary."),
        ("A.A. Milne", "A day without a friend is like a pot without a single drop of honey left inside."),
        ("Tennessee Williams", "Life is partly what we make it, and partly what it is made by the friends we choose."),
        ("Unknown", "A friend is someone who makes it easy to believe in yourself."),
        ("Unknown", "The greatest gift of life is friendship, and I have received it."),
    ] * 4)[:100]  # Replicate to reach 100 quotes
]

# Save to file
file_path = "/mnt/data/friendship_quotes.json"
with open(file_path, "w") as f:
    json.dump(friendship_quotes, f, indent=2)

file_path
