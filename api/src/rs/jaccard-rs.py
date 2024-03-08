from sklearn.metrics import jaccard_score
import sys
import json
import datetime


def get_user_features(user, user_fields, interests_indexes):
    return [user[field] for field in user_fields] + [user['interests'][i] for i in interests_indexes]


def append_field(user, field, user_fields):
    if user[field] != 0:
        user_fields.append(field)


def get_user_fields(user, users):
    user_fields = []

    if user['birth_year'] != 0:
        user_fields.append('age_category')
        user['age_category'] = 1
        for u in users:
            if user['birth_year'] - 5 <= u['birth_year'] <= user['birth_year'] + 5:
                u['age_category'] = 1
            else:
                u['age_category'] = 0

    append_field(user, 'country_id', user_fields)
    append_field(user, 'state_id', user_fields)
    append_field(user, 'city_id', user_fields)
    append_field(user, 'university_id', user_fields)
    return user_fields


def make_recommendations():
    times = {'start': datetime.datetime.now(), 'count_similarities': 0, 'sort_similarities': 0, 'write_results': 0,
             'finish': 0}

    json_obj = open(sys.argv[1], encoding='utf-8')
    data = json.load(json_obj)

    user = data['user']
    users = data['users']

    user_fields = get_user_fields(user, users)
    interests_indexes = [index for index, value in enumerate(user['interests']) if value == 1]

    user_features = get_user_features(user, user_fields, interests_indexes)
    users_features = [get_user_features(u, user_fields, interests_indexes) for u in users]

    times['count_similarities'] = datetime.datetime.now()
    similarities = []
    for i, uf in enumerate(users_features):
        jaccard_distance = jaccard_score(user_features, uf, average='micro')
        similarities.append((users[i]['user_id'], jaccard_distance))

    times['sort_similarities'] = datetime.datetime.now()
    similarities.sort(key=lambda x: x[1], reverse=True)
    recommended_users = [u for u, s in similarities[:10]]
    json_object_result = json.dumps(recommended_users)

    times['write_results'] = datetime.datetime.now()
    with open(sys.argv[2], "w") as outfile:
        outfile.write(json_object_result)
    times['finish'] = datetime.datetime.now()

    for name, time in times.items():
        with open("tmp/rs/times.txt", 'a') as outfile:
            outfile.write(f"{name}: {time} \n")

    print("OK")


if __name__ == "__main__":
    make_recommendations()

sys.stdout.flush()
