from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from sklearn.metrics import jaccard_score


def hello(request):
    return JsonResponse({"message": "hello"})


def get_user_features(user, user_fields):
    return [user[field] for field in user_fields]


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

def jaccard_score_for_sets(set1, set2):
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union)

@csrf_exempt
@require_http_methods(["POST"])
def jaccard_recommendations(request):
    data = json.loads(request.body)
    user = data['user']
    users = data['users']

    user_fields = get_user_fields(user, users)

    user_features = get_user_features(user, user_fields)
    users_features = [get_user_features(u, user_fields) for u in users]

    user_interests = set(user['interests'])

    similarities = []
    for i, uf in enumerate(users_features):
        u_interests = set(users[i]['interests'])
        s1 = jaccard_score(user_features, uf, average='micro')
        s2 = jaccard_score_for_sets(user_interests, u_interests)
        similarities.append((users[i]['user_id'], s1 + s2))

    similarities.sort(key=lambda x: x[1], reverse=True)
    recommended_users = [u for u, s in similarities[:10]]
    return JsonResponse(recommended_users, safe=False)
