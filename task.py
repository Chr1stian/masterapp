def poly_part(c, n):
    result = ""
    if c != 0:
        if n == 0:
            result = str(c)
        else:
            if c == -1:
            result = "-x"
            elif c == 1:
                result = "x"
            elif abs(c) > 1:
                result = str(c) + "*x"
            if n > 1:
                result += "**" + str(n)
    return result
